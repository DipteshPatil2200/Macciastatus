import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: { en: string; mr: string };
  siteDescription: { en: string; mr: string };
  siteEmail: string;
  sitePhone: string;
  siteAddress: { en: string; mr: string };
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  logoUrl?: string;
  footerIntro: { en: string; mr: string };
  headerNavigation: Array<{ label: { en: string; mr: string }; url: string; order: number; isActive: boolean }>;
  footerNavigation: Array<{ label: { en: string; mr: string }; url: string; order: number; isActive: boolean }>;
  newsletterSettings: { enabled: boolean; consentText: { en: string; mr: string } };
  mediaCarouselInterval: number;
  homepageSections: Array<{ key: string; heading: string; description: string; ctaLabel?: string; ctaUrl?: string; enabled: boolean; order: number }>;
  foundingYear: string;
  presidentName: { en: string; mr: string };
  presidentMessage: { en: string; mr: string };
  presidentPhoto?: string;
  establishedYear: string;
  directMembers: string;
  associations: string;
  tradeEntities: string;
  historyContent: { en: string; mr: string };
  vision: { en: string; mr: string };
  mission: { en: string; mr: string };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const SettingsSchema: Schema = new Schema(
  {
    siteName: {
      en: { type: String, default: 'Maharashtra Chamber of Commerce, Industry & Agriculture' },
      mr: { type: String, default: 'महाराष्ट्र चॅम्बर आॅफ कमर्स, इंडस्ट्री अँड अॅग्रीकल्चर' },
    },
    siteDescription: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    siteEmail: { type: String, default: '' },
    sitePhone: { type: String, default: '' },
    siteAddress: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    facebook: { type: String, default: '', match: [/^$|^https:\/\//, 'Facebook URL must use HTTPS'] },
    instagram: { type: String, default: '', match: [/^$|^https:\/\//, 'Instagram URL must use HTTPS'] },
    twitter: { type: String, default: '', match: [/^$|^https:\/\//, 'Social URL must use HTTPS'] },
    linkedin: { type: String, default: '', match: [/^$|^https:\/\//, 'LinkedIn URL must use HTTPS'] },
    youtube: { type: String, default: '', match: [/^$|^https:\/\//, 'YouTube URL must use HTTPS'] },
    logoUrl: { type: String, default: '/images/maccia-logo.png', match: [/^(\/|https:\/\/)/, 'Logo URL must be an internal path or HTTPS URL'] },
    footerIntro: {
      en: { type: String, default: 'Advancing commerce, industry and agriculture through representation, knowledge and connection.' },
      mr: { type: String, default: '' },
    },
    headerNavigation: [{
      label: { en: { type: String, required: true }, mr: { type: String, default: '' } },
      url: { type: String, required: true, match: [/^(\/|https:\/\/)/, 'Navigation URL must be an internal path or HTTPS URL'] },
      order: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
    }],
    footerNavigation: [{
      label: { en: { type: String, required: true }, mr: { type: String, default: '' } },
      url: { type: String, required: true, match: [/^(\/|https:\/\/)/, 'Navigation URL must be an internal path or HTTPS URL'] },
      order: { type: Number, default: 0 },
      isActive: { type: Boolean, default: true },
    }],
    newsletterSettings: {
      enabled: { type: Boolean, default: true },
      consentText: {
        en: { type: String, default: 'By subscribing, you consent to receive MACCIA updates. You can unsubscribe at any time.' },
        mr: { type: String, default: '' },
      },
    },
    mediaCarouselInterval: { type: Number, default: 7000, min: 3000, max: 30000 },
    homepageSections: [{
      key: { type: String, required: true }, heading: { type: String, required: true }, description: { type: String, default: '' },
      ctaLabel: { type: String, default: '' }, ctaUrl: { type: String, default: '' }, enabled: { type: Boolean, default: true }, order: { type: Number, default: 0 },
    }],
    foundingYear: { type: String, default: '1927' },
    presidentName: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    presidentMessage: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    presidentPhoto: { type: String, default: '' },
    establishedYear: { type: String, default: '1927' },
    directMembers: { type: String, default: '6,000+' },
    associations: { type: String, default: '350+' },
    tradeEntities: { type: String, default: '2,000,000+' },
    historyContent: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    vision: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    mission: {
      en: { type: String, default: '' },
      mr: { type: String, default: '' },
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true, collection: 'settings' }
);

export default mongoose.model<ISettings>('Settings', SettingsSchema);
