import { Request, Response, NextFunction } from 'express';
import Settings from '../../models/Settings';
import { createError } from '../../utils/errorHandler';

const DEFAULT_SETTINGS = {
  siteName: {
    en: 'Maharashtra Chamber of Commerce, Industry & Agriculture',
    mr: 'महाराष्ट्र चॅम्बर आॅफ कमर्स, इंडस्ट्री अँड अॅग्रीकल्चर',
  },
  siteEmail: 'maccia@maccia.org.in',
  sitePhone: '022 6739 5800',
  siteAddress: {
    en: 'Oricon House, 6th Floor, Maharashtra Chamber Lane, K. Dubash Marg, Kala Ghoda, Fort, Mumbai – 400001',
    mr: 'ऑरिकॉन हाऊस, ६ वा मजला, महाराष्ट्र चेंबर लेन, काळा घोडा, फोर्ट, मुंबई – ४००००१',
  },
  foundingYear: '1927',
  establishedYear: '1927',
  directMembers: '6,000+',
  associations: '350+',
  tradeEntities: '2,000,000+',
  presidentName: {
    en: 'Ravindra Mangave',
    mr: 'रविंद्र माणगावे',
  },
  logoUrl: '/images/maccia-logo.png',
  footerIntro: {
    en: 'Advancing commerce, industry and agriculture through representation, knowledge and connection.',
    mr: '',
  },
  newsletterSettings: {
    enabled: true,
    consentText: {
      en: 'By subscribing, you consent to receive MACCIA updates. You can unsubscribe at any time.',
      mr: '',
    },
  },
  mediaCarouselInterval: 7000,
  homepageSections: [
    { key: 'services', heading: 'Business support, within reach', description: '', enabled: true, order: 10 },
    { key: 'media', heading: 'MACCIA Media Connect', description: 'Stay Connected with MACCIA – Events, Industry Insights & Business Opportunities.', enabled: true, order: 20 },
    { key: 'members', heading: 'Discover Our Business Community', description: '', enabled: true, order: 30 },
    { key: 'opportunities', heading: 'Explore Business Opportunities', description: '', enabled: true, order: 40 },
    { key: 'events', heading: 'Upcoming Business Events', description: '', enabled: true, order: 50 },
    { key: 'stories', heading: 'Member Stories & Business Achievements', description: '', enabled: true, order: 60 },
    { key: 'membership', heading: 'Grow Your Business with MACCIA', description: '', enabled: true, order: 70 },
    { key: 'enquiry', heading: 'Start a Membership Conversation', description: '', enabled: true, order: 80 },
  ],
};

export const getSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true, runValidators: true, upsert: true });
    }

    if (!settings) return next(createError(500, 'Unable to update settings'));
    await settings.save();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
