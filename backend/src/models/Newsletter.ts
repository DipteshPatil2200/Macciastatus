import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  name?: string;
  subscribedAt: Date;
  isActive: boolean;
  preferences: {
    news: boolean;
    events: boolean;
    announcements: boolean;
    newsletter: boolean;
  };
}

const NewsletterSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: '' },
    subscribedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    preferences: {
      news: { type: Boolean, default: true },
      events: { type: Boolean, default: true },
      announcements: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
