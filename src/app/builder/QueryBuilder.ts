import { FilterQuery, isValidObjectId, Model, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  private allowedFields = [
    'searchTerm',
    'sort',
    'page',
    'limit',
    'fields',
    'id',
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
    const searchTerm = this.query.searchTerm as string;
    if (searchTerm && searchableFields.length > 0) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }

    return this;
  }

  filter() {
    const sanitizedQuery = this.validateQuery(this.query);
    const queryObj = { ...sanitizedQuery }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort(defaultSort = '-createdAt') {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || defaultSort;
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate(defaultPage = 1, defaultLimit = 10) {
    const page = Number(this?.query?.page) || defaultPage;
    const limit = Number(this?.query?.limit) || defaultLimit;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  limitFields(defaultFields = '-__v') {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || defaultFields;

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
