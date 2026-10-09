import mongoose, { Schema, Document } from 'mongoose';

export interface IStatistic extends Document {
  label: { en: string; mr: string };
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

const StatisticSchema: Schema = new Schema(
  {
    label: {
      en: { type: String, required: true },
      mr: { type: String, required: true },
    },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
    prefix: { type: String, default: '' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IStatistic>('Statistic', StatisticSchema);
