import mongoose, { Document, Schema } from 'mongoose';

export type MediaType = 'youtube' | 'youtube_short' | 'instagram_post' | 'instagram_reel' | 'uploaded_video' | 'uploaded_image';
export type MediaStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface IHomepageMedia extends Document {
  title: string; caption?: string; type: MediaType; sourceUrl?: string; storageKey?: string;
  thumbnailUrl?: string; platformMediaId?: string; status: MediaStatus; displayOrder: number;
  featured: boolean; homepageEnabled: boolean; publishAt?: Date; createdBy: mongoose.Types.ObjectId;
}

const HomepageMediaSchema = new Schema<IHomepageMedia>({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  caption: { type: String, trim: true, maxlength: 600, default: '' },
  type: { type: String, required: true, enum: ['youtube','youtube_short','instagram_post','instagram_reel','uploaded_video','uploaded_image'] },
  sourceUrl: { type: String, trim: true },
  storageKey: { type: String, trim: true },
  thumbnailUrl: { type: String, trim: true },
  platformMediaId: { type: String, trim: true },
  status: { type: String, enum: ['draft','scheduled','published','archived'], default: 'draft', index: true },
  displayOrder: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false },
  homepageEnabled: { type: Boolean, default: true, index: true },
  publishAt: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

HomepageMediaSchema.index({ status: 1, homepageEnabled: 1, publishAt: 1, displayOrder: 1 });
HomepageMediaSchema.index({ type: 1, platformMediaId: 1 }, { sparse: true });

export default mongoose.model<IHomepageMedia>('HomepageMedia', HomepageMediaSchema);
