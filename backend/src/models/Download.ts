import mongoose, { Schema, Document } from 'mongoose';

export type DownloadCategory =
  | 'circulars'
  | 'government-notifications'
  | 'forms'
  | 'reports'
  | 'publications'
  | 'chamber-patrika'
  | 'membership-documents'
  | 'event-documents'
  | 'policies'
  | 'annual-reports';

export interface IDownload extends Document {
  title: { en: string; mr: string };
  description?: { en: string; mr: string };
  file: string;
  fileSize?: string;
  fileType?: string;
  category: DownloadCategory;
  date: Date;
  isActive: boolean;
}

const DownloadSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    description: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    file: { type: String, required: true },
    fileSize: { type: String, default: '' },
    fileType: { type: String, default: '' },
    category: {
      type: String,
      enum: [
        'circulars',
        'government-notifications',
        'forms',
        'reports',
        'publications',
        'chamber-patrika',
        'membership-documents',
        'event-documents',
        'policies',
        'annual-reports',
      ],
      required: true,
    },
    date: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDownload>('Download', DownloadSchema);
