import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadership extends Document {
  name: { en: string; mr: string };
  designation: { en: string; mr: string };
  photo: string;
  bio?: { en: string; mr: string };
  email?: string;
  phone?: string;
  order: number;
  type: 'president' | 'vice-president' | 'secretary' | 'treasurer' | 'committee-member' | 'past-president' | 'managing-committee' | 'expert-committee';
  isActive: boolean;
}

const LeadershipSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    designation: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    photo: { type: String, required: true },
    bio: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    order: { type: Number, default: 0 },
    type: {
      type: String,
      enum: [
        'president',
        'vice-president',
        'secretary',
        'treasurer',
        'committee-member',
        'past-president',
        'managing-committee',
        'expert-committee',
      ],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ILeadership>('Leadership', LeadershipSchema);
