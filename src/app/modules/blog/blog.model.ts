import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

const BlogModel = model<IBlog>('Blog', BlogSchema);

export default BlogModel;
