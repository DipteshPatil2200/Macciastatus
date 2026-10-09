import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: { en: string; mr: string };
  description?: { en: string; mr: string };
  videoUrl: string;
  thumbnail: string;
  category: { en: string; mr: string };
  eventId?: mongoose.Types.ObjectId;
  eventTitle?: string;
  year: number;
  duration?: string;
  isFeatured: boolean;
  isActive: boolean;
}

const VideoSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    eventTitle: { type: String, default: '' },
    year: { type: Number, required: true },
    duration: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IVideo>('Video', VideoSchema);
