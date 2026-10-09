import mongoose, { Schema, Document } from 'mongoose';

export type EnquiryType =
  | 'general'
  | 'membership'
  | 'service'
  | 'venue'
  | 'events'
  | 'press';

export type EnquiryStatus = 'new' | 'in-progress' | 'resolved' | 'closed';

export interface IContactEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiryType: EnquiryType;
  status: EnquiryStatus;
  adminNotes?: string;
  isRead: boolean;
}

const ContactEnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    enquiryType: {
      type: String,
      enum: ['general', 'membership', 'service', 'venue', 'events', 'press'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new',
    },
    adminNotes: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
