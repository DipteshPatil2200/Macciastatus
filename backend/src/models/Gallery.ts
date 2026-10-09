import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: { en: string; mr: string };
  description?: { en: string; mr: string };
  image: string;
  category: { en: string; mr: string };
  eventId?: mongoose.Types.ObjectId;
  eventTitle?: string;
  year: number;
  order: number;
  isFeatured: boolean;
}

const GalleryItemSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    image: { type: String, required: true },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    eventTitle: { type: String, default: '' },
    year: { type: Number, required: true },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
