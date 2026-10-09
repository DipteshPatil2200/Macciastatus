import mongoose, { Schema, Document } from 'mongoose';

export enum ServiceType {
  CERTIFICATE_OF_ORIGIN = 'certificate-of-origin',
  VISA_FACILITATION = 'visa-facilitation',
  TRAINING_WORKSHOPS = 'training-workshops',
  ARBITRATION_MEDIATION = 'arbitration-mediation',
  VENUE_BOOKING = 'venue-booking',
  OTHER = 'other',
}

export interface IService extends Document {
  title: { en: string; mr: string };
  slug: string;
  description: { en: string; mr: string };
  shortDescription: { en: string; mr: string };
  overview: { en: string; mr: string };
  eligibility?: { en: string; mr: string };
  benefits?: { en: string; mr: string };
  requiredDocuments?: string[];
  process?: string[];
  faqs?: Array<{
    question: { en: string; mr: string };
    answer: { en: string; mr: string };
  }>;
  contactInfo: {
    email: string;
    phone: string;
  };
  image: string;
  icon: string;
  serviceType: ServiceType;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const ServiceSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    description: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    shortDescription: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    overview: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    eligibility: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    benefits: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    requiredDocuments: [{ type: String }],
    process: [{ type: String }],
    faqs: [
      {
        question: {
          en: { type: String, required: true },
          mr: { type: String, required: true },
        },
        answer: {
          en: { type: String, required: true },
          mr: { type: String, required: true },
        },
      },
    ],
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    image: { type: String, required: true },
    icon: { type: String, default: 'service' },
    serviceType: { type: String, enum: Object.values(ServiceType), required: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
