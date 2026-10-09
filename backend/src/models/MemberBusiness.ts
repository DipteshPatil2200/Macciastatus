import mongoose, { Document, Schema } from 'mongoose';

export interface IMemberBusiness extends Document {
  companyName: string; slug: string; industry: string; city: string; logoUrl?: string;
  description: string; website?: string; enquiryEnabled: boolean; contactConsent: boolean;
  featured: boolean; approvalStatus: 'pending'|'approved'|'rejected'; published: boolean; displayOrder: number;
}

const MemberBusinessSchema = new Schema<IMemberBusiness>({
  companyName: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  industry: { type: String, required: true, trim: true, index: true },
  city: { type: String, required: true, trim: true, index: true },
  logoUrl: { type: String, trim: true, default: '' },
  description: { type: String, required: true, trim: true, maxlength: 1200 },
  website: { type: String, trim: true, match: [/^$|^https:\/\//, 'Website must use HTTPS'] },
  enquiryEnabled: { type: Boolean, default: true },
  contactConsent: { type: Boolean, default: false },
  featured: { type: Boolean, default: false, index: true },
  approvalStatus: { type: String, enum: ['pending','approved','rejected'], default: 'pending', index: true },
  published: { type: Boolean, default: false, index: true },
  displayOrder: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

MemberBusinessSchema.index({ approvalStatus: 1, published: 1, featured: -1, displayOrder: 1 });
MemberBusinessSchema.index({ companyName: 'text', industry: 'text', city: 'text', description: 'text' });
export default mongoose.model<IMemberBusiness>('MemberBusiness', MemberBusinessSchema);
