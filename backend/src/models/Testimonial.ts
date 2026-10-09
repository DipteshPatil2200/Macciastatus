import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: { en: string; mr: string };
  designation: { en: string; mr: string };
  company?: string;
  content: { en: string; mr: string };
  photo?: string;
  rating: number;
  order: number;
  isActive: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    designation: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    company: { type: String, default: '' },
    content: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    photo: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
