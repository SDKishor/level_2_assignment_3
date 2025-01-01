import { FilterQuery, isValidObjectId, Model, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  private allowedFields = [
    'search',
    'sortBy',
    'page',
    'limit',
    'fields',
    'id',
    'sortOrder',
  ];

  constructor(
    modelQuery: Query<T[], T>,
    query: Record<string, unknown>,
    model: Model<T>,
  ) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.allowedFields = [
      ...Object.keys(model.schema.paths),
      ...this.allowedFields,
    ];
  }

  private isPositiveInteger(value: unknown): boolean {
    return Number.isInteger(Number(value)) && Number(value) > 0;
  }
  private escapeString(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private validateQuery(
    query: Record<string, unknown>,
    strictValidation = true,
  ): Record<string, unknown> {
    const sanitizedQuery: Record<string, unknown> = {};

    for (const key in query) {
      if (!this.allowedFields.includes(key)) {
        if (strictValidation) {
          throw new Error(`Invalid query parameter: ${key}`);
        }
        continue;
      }

      const value = query[key];

      if (key === 'page' || key === 'limit') {
        sanitizedQuery[key] = this.isPositiveInteger(value) ? Number(value) : 1;
      } else if (key === 'id' && typeof value === 'string') {
        sanitizedQuery[key] = isValidObjectId(value) ? value : null;
      } else if (typeof value === 'string') {
        sanitizedQuery[key] = this.escapeString(value);
      } else {
        sanitizedQuery[key] = value;
      }
    }
    return sanitizedQuery;
  }

  search(searchableFields: string[]) {
    const search = this.query.search as string;
    if (search && searchableFields.length > 0) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const sanitizedQuery = this.validateQuery(this.query);
    const queryObj = { ...sanitizedQuery }; // copy

    // Filtering
    const excludeFields = [
      'search',
      'sortBy',
      'limit',
      'page',
      'fields',
      'sortOrder',
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sortBy(defaultSort = 'createdAt') {
    const sortByField =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || defaultSort;
    const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortByField}`);

    return this;
  }

  fields(fields: string[]) {
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
