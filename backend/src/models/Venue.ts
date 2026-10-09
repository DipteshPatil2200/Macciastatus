import mongoose, { Schema, Document } from 'mongoose';

export interface IVenue extends Document {
  name: { en: string; mr: string };
  slug: string;
  description: { en: string; mr: string };
  capacity: number;
  hourlyRate: number;
  halfDayRate: number;
  fullDayRate: number;
  securityDeposit: number;
  facilities: string[];
  idealUsage: { en: string; mr: string };
  amenities: string[];
  images: string[];
  isActive: boolean;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const VenueSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    capacity: { type: Number, required: true },
    hourlyRate: { type: Number, required: true },
    halfDayRate: { type: Number, required: true },
    fullDayRate: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    facilities: [{ type: String }],
    idealUsage: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVenue>('Venue', VenueSchema);
