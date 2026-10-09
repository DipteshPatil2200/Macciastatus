import { Request, Response, NextFunction } from 'express';
import HeroSlide from '../../models/HeroSlide';
import Statistic from '../../models/Statistic';
import Settings from '../../models/Settings';
import News from '../../models/News';
import Event from '../../models/Event';
import Service from '../../models/Service';
import Testimonial from '../../models/Testimonial';
import Partner from '../../models/Partner';
import Announcement from '../../models/Announcement';
import GalleryItem from '../../models/Gallery';
import Video from '../../models/Video';
import Download from '../../models/Download';
import HomepageMedia from '../../models/HomepageMedia';
import MemberBusiness from '../../models/MemberBusiness';
import BusinessOpportunity from '../../models/BusinessOpportunity';
import { publicMediaQuery } from '../../utils/mediaValidation';

export const getHomepageData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const settings = await Settings.findOne();
    const heroSlides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    const statistics = await Statistic.find({ isActive: true }).sort({ order: 1 });
    const announcements = await Announcement.find({ isPublished: true, $or: [{ expiryDate: { $exists: false } }, { expiryDate: null }, { expiryDate: { $gte: new Date() } }] }).sort({ priority: -1 });
    const featuredNews = await News.find({ status: 'published', isFeatured: true }).sort({ publishDate: -1 }).limit(6);
    const upcomingEvents = await Event.find({ eventType: 'upcoming', status: 'published', date: { $gte: new Date() } }).sort({ isFeatured: -1, date: 1 }).limit(8);
    const featuredServices = await Service.find({ isFeatured: true, isActive: true }).sort({ order: 1 });
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    const partners = await Partner.find({ isActive: true }).sort({ order: 1 });
    const latestPublications = await Download.find({ isActive: true, category: 'chamber-patrika' }).sort({ date: -1 }).limit(3);
    const homepageMedia = await HomepageMedia.find(publicMediaQuery()).select('-createdBy -storageKey').sort({ displayOrder: 1, createdAt: -1 }).limit(12);
    const memberBusinesses = await MemberBusiness.find({ approvalStatus: 'approved', published: true }).select('-contactConsent').sort({ featured: -1, displayOrder: 1 }).limit(9);
    const businessOpportunities = await BusinessOpportunity.find({ status: 'published', $or: [{ closingDate: { $exists: false } }, { closingDate: null }, { closingDate: { $gte: new Date() } }] }).sort({ featured: -1, displayOrder: 1, createdAt: -1 }).limit(8);

    res.status(200).json({
      success: true,
      data: {
        settings,
        heroSlides,
        statistics,
        announcements,
        featuredNews,
        upcomingEvents,
        featuredServices,
        testimonials,
        partners,
        latestPublications,
        homepageMedia,
        memberBusinesses,
        businessOpportunities,
      },
    });
  } catch (error) {
    next(error);
  }
};
