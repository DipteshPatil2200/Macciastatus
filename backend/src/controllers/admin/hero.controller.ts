import { Request, Response, NextFunction } from 'express';
import HeroSlide from '../../models/HeroSlide';
import { createError } from '../../utils/errorHandler';

const DEFAULT_HERO_SLIDES = [
  {
    title: {
      en: 'Maharashtra Chamber of Commerce, Industry & Agriculture',
      mr: 'महाराष्ट्र चॅम्बर आॅफ कमर्स, इंडस्ट्री अँड अॅग्रीकल्चर',
    },
    subtitle: {
      en: 'Supporting Maharashtra\'s economic and industrial development since 1967',
      mr: 'महाराष्ट्राच्या आर्थिक आणि उद्योग विकासासाठी १९६७ आधी पासपुरी',
    },
    ctaText: {
      en: 'Explore MACCIA',
      mr: 'MACCIA चा उल्लेख करा',
    },
    ctaLink: '/about-us',
    image: '/images/hero-bg.jpg',
    order: 0,
    isActive: true,
  },
  {
    title: {
      en: 'Connecting Businesses, Empowering Growth',
      mr: 'व्यवसायांना जोडणे, वाढीस सशक्तीकरण',
    },
    subtitle: {
      en: 'Your trusted partner for trade, industry, and agriculture development',
      mr: 'ट्रेड, उद्योग आणि कृषी विकासासाठी तुमचा विश्वासार्थी साथी',
    },
    ctaText: {
      en: 'Our Services',
      mr: 'आमची सेवा',
    },
    ctaLink: '/services',
    image: '/images/hero-bg-2.jpg',
    order: 1,
    isActive: true,
  },
];

export const getHeroSlides = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });

    if (slides.length === 0) {
      slides = DEFAULT_HERO_SLIDES as any;
    }

    res.status(200).json({
      success: true,
      data: slides,
    });
  } catch (error) {
    next(error);
  }
};

export const getHeroSlidesAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: slides,
    });
  } catch (error) {
    next(error);
  }
};

export const createHeroSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slide = await HeroSlide.create(req.body);
    res.status(201).json({
      success: true,
      data: slide,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHeroSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!slide) {
      return next(createError(404, 'Hero slide not found'));
    }

    res.status(200).json({
      success: true,
      data: slide,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHeroSlide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findByIdAndDelete(id);

    if (!slide) {
      return next(createError(404, 'Hero slide not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Hero slide deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
