import mongoose, { Schema, Document } from 'mongoose';

export type MembershipCategory =
  | 'corporate'
  | 'associate'
  | 'individual'
  | 'firm'
  | 'senior-citizen'
  | 'msme'
  | 'startup'
  | 'foreign';

export type ApplicationStatus = 'pending' | 'under-review' | 'approved' | 'rejected';

export interface IMembershipApplication extends Document {
  category: MembershipCategory;
  fullName: string;
  companyName?: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  businessType?: string;
  annualTurnover?: string;
  numEmployees?: string;
  documents?: string[];
  agreeToTerms: boolean;
  status: ApplicationStatus;
  adminNotes?: string;
}

const MembershipApplicationSchema: Schema = new Schema(
  {
    category: {
      type: String,
      enum: ['corporate', 'associate', 'individual', 'firm', 'senior-citizen', 'msme', 'startup', 'foreign'],
      required: true,
    },
    fullName: { type: String, required: true },
    companyName: { type: String, default: '' },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    businessType: { type: String, default: '' },
    annualTurnover: { type: String, default: '' },
    numEmployees: { type: String, default: '' },
    documents: [{ type: String }],
    agreeToTerms: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IMembershipApplication>(
  'MembershipApplication',
  MembershipApplicationSchema
);
