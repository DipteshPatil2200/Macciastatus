import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  title: { en: string; mr: string };
  slug: string;
  content: { en: string; mr: string };
  link?: string;
  publishDate: Date;
  expiryDate?: Date;
  priority: number;
  isPublished: boolean;
}

const AnnouncementSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    content: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    link: { type: String, default: '' },
    publishDate: { type: Date, required: true },
    expiryDate: { type: Date },
    priority: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
