import { z } from 'zod';

export const BlogZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),
  isPublished: z.boolean().optional().default(true),
});
