import mongoose, { Schema, Document } from 'mongoose';

export type OfficeType = 'head-office' | 'regional-office' | 'district-office';

export interface IOffice extends Document {
  name: { en: string; mr: string };
  type: OfficeType;
  address: { en: string; mr: string };
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  order: number;
}

const OfficeSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    type: {
      type: String,
      enum: ['head-office', 'regional-office', 'district-office'],
      required: true,
    },
    address: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IOffice>('Office', OfficeSchema);
