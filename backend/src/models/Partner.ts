import mongoose, { Schema, Document } from 'mongoose';

export type PartnerType = 'national' | 'international' | 'government' | 'corporate' | 'media';

export interface IPartner extends Document {
  name: string;
  logo: string;
  website?: string;
  type: PartnerType;
  order: number;
  isActive: boolean;
}

const PartnerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    website: { type: String, default: '' },
    type: {
      type: String,
      enum: ['national', 'international', 'government', 'corporate', 'media'],
      required: true,
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPartner>('Partner', PartnerSchema);
