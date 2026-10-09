import mongoose, { Schema, Document } from 'mongoose';

export type EventType = 'upcoming' | 'past' | 'recent';
export type EventStatus = 'draft' | 'published' | 'cancelled';

export interface IEvent extends Document {
  title: { en: string; mr: string };
  slug: string;
  description: { en: string; mr: string };
  shortDescription: { en: string; mr: string };
  date: Date;
  endDate?: Date;
  time: string;
  venue: { en: string; mr: string };
  location: { en: string; mr: string };
  featuredImage: string;
  gallery: string[];
  registrationLink?: string;
  registrationOpen: boolean;
  eventType: EventType;
  status: EventStatus;
  category: { en: string; mr: string };
  isFeatured: boolean;
  attachments?: string[];
  speaker?: {
    name: string;
    designation: { en: string; mr: string };
    photo?: string;
    bio?: { en: string; mr: string };
  }[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const EventSchema: Schema = new Schema(
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
    date: { type: Date, required: true },
    endDate: { type: Date },
    time: { type: String, required: true },
    venue: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    location: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    featuredImage: { type: String, required: true },
    gallery: [{ type: String }],
    registrationLink: { type: String },
    registrationOpen: { type: Boolean, default: true },
    eventType: {
      type: String,
      enum: ['upcoming', 'past', 'recent'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled'],
      default: 'draft',
    },
    category: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    isFeatured: { type: Boolean, default: false },
    attachments: [{ type: String }],
    speaker: [
      {
        name: { type: String, required: true },
        designation: {
          en: { type: String, required: true },
          mr: { type: String, required: true },
        },
        photo: { type: String },
        bio: {
          en: { type: String },
          mr: { type: String },
        },
      },
    ],
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
