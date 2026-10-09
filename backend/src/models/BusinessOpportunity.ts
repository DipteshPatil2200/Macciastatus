import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessOpportunity extends Document {
  title: string; category: string; industry: string; city: string; description: string;
  closingDate?: Date; status: 'draft'|'pending'|'published'|'archived'; featured: boolean;
  contactEmail?: string; enquiryCount: number; imageUrl?: string; detailUrl?: string; displayOrder: number;
}

const BusinessOpportunitySchema = new Schema<IBusinessOpportunity>({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  category: { type: String, required: true, enum: ['buyer-requirement','supplier-requirement','business-partnership','export-opportunity','industry-collaboration','networking-request'] },
  industry: { type: String, required: true, trim: true, index: true },
  city: { type: String, required: true, trim: true, index: true },
  description: { type: String, required: true, trim: true, maxlength: 1600 },
  closingDate: { type: Date, index: true },
  status: { type: String, enum: ['draft','pending','published','archived'], default: 'draft', index: true },
  featured: { type: Boolean, default: false },
  imageUrl: { type: String, trim: true, validate: { validator: (value?: string) => !value || /^(\/|https:\/\/)/i.test(value), message: 'Image URL must be an internal path or HTTPS URL' } },
  detailUrl: { type: String, trim: true, validate: { validator: (value?: string) => !value || /^(\/|https:\/\/)/i.test(value), message: 'Detail URL must be an internal path or HTTPS URL' } },
  displayOrder: { type: Number, default: 0, min: 0 },
  contactEmail: { type: String, select: false, trim: true, lowercase: true },
  enquiryCount: { type: Number, default: 0, min: 0 },
}, { timestamps: true });
BusinessOpportunitySchema.index({ status: 1, closingDate: 1, featured: -1, displayOrder: 1, createdAt: -1 });
export default mongoose.model<IBusinessOpportunity>('BusinessOpportunity', BusinessOpportunitySchema);
