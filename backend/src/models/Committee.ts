import mongoose, { Schema, Document } from 'mongoose';

export type CommitteeType = 'managing' | 'expert';

export interface ICommitteeMember {
  name: { en: string; mr: string };
  designation: { en: string; mr: string };
  photo?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface ICommittee extends Document {
  name: { en: string; mr: string };
  description: { en: string; mr: string };
  type: CommitteeType;
  slug: string;
  members: ICommitteeMember[];
  isActive: boolean;
}

const CommitteeMemberSchema: Schema = new Schema({
  name: {
    en: { type: String, required: true },
    mr: { type: String, required: true },
  },
  designation: {
    en: { type: String, required: true },
    mr: { type: String, required: true },
  },
  photo: { type: String, default: '' },
  company: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
});

const CommitteeSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    type: {
      type: String,
      enum: ['managing', 'expert'],
      required: true,
    },
    slug: { type: String, required: true, unique: true },
    members: [CommitteeMemberSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICommittee>('Committee', CommitteeSchema);
