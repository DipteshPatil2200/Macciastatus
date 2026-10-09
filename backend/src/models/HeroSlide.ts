import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide extends Document {
  title: { en: string; mr: string };
  subtitle?: { en: string; mr: string };
  ctaText: { en: string; mr: string };
  ctaLink: string;
  image: string;
  mobileImage?: string;
  order: number;
  isActive: boolean;
}

const HeroSlideSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    ctaText: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    ctaLink: { type: String, required: true },
    image: { type: String, required: true },
    mobileImage: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);
