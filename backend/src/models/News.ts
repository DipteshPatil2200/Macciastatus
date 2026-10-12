import mongoose, { Schema, Document } from 'mongoose';
import { DocumentStatus, LanguageCode } from '../types';

export interface INews extends Document {
  title: { en: string; mr: string };
  slug: string;
  excerpt: { en: string; mr: string };
  content: { en: string; mr: string };
  category: { en: string; mr: string };
  featuredImage: string;
  author: string;
  publishDate: Date;
  status: DocumentStatus;
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  attachments?: string[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const NewsSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    excerpt: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    featuredImage: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0, min: 0 },
    tags: [{ type: String }],
    attachments: [{ type: String }],
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<INews>('News', NewsSchema);
