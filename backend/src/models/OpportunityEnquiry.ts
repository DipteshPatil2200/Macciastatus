import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunityEnquiry extends Document { opportunity: mongoose.Types.ObjectId; name: string; company: string; email: string; phone: string; message: string; status: string; }
const OpportunityEnquirySchema = new Schema<IOpportunityEnquiry>({
  opportunity: { type: Schema.Types.ObjectId, ref: 'BusinessOpportunity', required: true, index: true },
  name: { type: String, required: true, trim: true }, company: { type: String, trim: true, default: '' },
  email: { type: String, required: true, trim: true, lowercase: true }, phone: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true, maxlength: 1200 },
  status: { type: String, enum: ['new','in-progress','resolved','closed'], default: 'new' },
}, { timestamps: true });
OpportunityEnquirySchema.index({ opportunity: 1, email: 1, createdAt: -1 });
export default mongoose.model<IOpportunityEnquiry>('OpportunityEnquiry', OpportunityEnquirySchema);
