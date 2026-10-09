import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { errorHandler } from './utils/errorHandler';
import { apiLimiter } from './middleware/rateLimit';

// Routes
import authRoutes from './routes/auth.routes';

// Admin Routes
import heroRoutes from './routes/admin/hero.routes';
import statisticsRoutes from './routes/admin/statistics.routes';
import settingsRoutes from './routes/admin/settings.routes';
import newsRoutes from './routes/admin/news.routes';
import eventsRoutes from './routes/admin/events.routes';
import servicesRoutes from './routes/admin/services.routes';
import leadershipRoutes from './routes/admin/leadership.routes';
import venuesRoutes from './routes/admin/venues.routes';
import galleryRoutes from './routes/admin/gallery.routes';
import downloadsRoutes from './routes/admin/downloads.routes';
import membershipRoutes from './routes/admin/membership.routes';
import committeesRoutes from './routes/admin/committees.routes';
import officesRoutes from './routes/admin/offices.routes';
import testimonialsRoutes from './routes/admin/testimonials.routes';
import partnersRoutes from './routes/admin/partners.routes';
import contactRoutesAdmin from './routes/admin/contact.routes';
import uploadsRoutes from './routes/admin/uploads.routes';
import announcementsRoutes from './routes/admin/announcements.routes';
import homepageMediaAdminRoutes from './routes/admin/homepageMedia.routes';
import memberBusinessesAdminRoutes from './routes/admin/memberBusinesses.routes';
import opportunitiesAdminRoutes from './routes/admin/opportunities.routes';
import membershipEnquiriesAdminRoutes from './routes/admin/membershipEnquiries.routes';

// Public Routes
import homepageRoutes from './routes/public/homepage.routes';
import publicNewsRoutes from './routes/public/news.routes';
import publicEventsRoutes from './routes/public/events.routes';
import publicServicesRoutes from './routes/public/services.routes';
import publicLeadershipRoutes from './routes/public/leadership.routes';
import publicVenuesRoutes from './routes/public/venues.routes';
import publicMembershipRoutes from './routes/public/membership.routes';
import publicContactRoutes from './routes/public/contact.routes';
import publicGalleryRoutes from './routes/public/gallery.routes';
import publicDownloadsRoutes from './routes/public/downloads.routes';
import publicNewsletterRoutes from './routes/public/newsletter.routes';
import publicHomepageMediaRoutes from './routes/public/homepageMedia.routes';
import publicMemberBusinessesRoutes from './routes/public/memberBusinesses.routes';
import publicOpportunitiesRoutes from './routes/public/opportunities.routes';
import publicMembershipEnquiryRoutes from './routes/public/membershipEnquiry.routes';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', apiLimiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MACCIA API is running' });
});

// Public Routes
app.use('/api/homepage', homepageRoutes);
app.use('/api/news', publicNewsRoutes);
app.use('/api/events', publicEventsRoutes);
app.use('/api/services', publicServicesRoutes);
app.use('/api/leadership', publicLeadershipRoutes);
app.use('/api/venues', publicVenuesRoutes);
app.use('/api/membership', publicMembershipRoutes);
app.use('/api/contact', publicContactRoutes);
app.use('/api/gallery', publicGalleryRoutes);
app.use('/api/downloads', publicDownloadsRoutes);
app.use('/api/newsletter', publicNewsletterRoutes);
app.use('/api/public/homepage-media', publicHomepageMediaRoutes);
app.use('/api/public/member-businesses', publicMemberBusinessesRoutes);
app.use('/api/public/opportunities', publicOpportunitiesRoutes);
app.use('/api/public/membership-enquiries', publicMembershipEnquiryRoutes);

// Auth Routes
app.use('/api/auth', authRoutes);

// Legacy API routes (backward compatibility)
app.use('/api/news', (req, res, next) => {
  if (req.method === 'POST') return publicNewsRoutes(req, res, next);
  next();
});

// Admin Routes (protected)
app.use('/api/admin/hero', heroRoutes);
app.use('/api/admin/statistics', statisticsRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/admin/news', newsRoutes);
app.use('/api/admin/events', eventsRoutes);
app.use('/api/admin/services', servicesRoutes);
app.use('/api/admin/leadership', leadershipRoutes);
app.use('/api/admin/venues', venuesRoutes);
app.use('/api/admin/gallery', galleryRoutes);
app.use('/api/admin/downloads', downloadsRoutes);
app.use('/api/admin/membership', membershipRoutes);
app.use('/api/admin/committees', committeesRoutes);
app.use('/api/admin/offices', officesRoutes);
app.use('/api/admin/testimonials', testimonialsRoutes);
app.use('/api/admin/partners', partnersRoutes);
app.use('/api/admin/contact', contactRoutesAdmin);
app.use('/api/admin/uploads', uploadsRoutes);
app.use('/api/admin/announcements', announcementsRoutes);
app.use('/api/admin/homepage-media', homepageMediaAdminRoutes);
app.use('/api/admin/member-businesses', memberBusinessesAdminRoutes);
app.use('/api/admin/opportunities', opportunitiesAdminRoutes);
app.use('/api/admin/membership-enquiries', membershipEnquiriesAdminRoutes);

// Error handler
app.use(errorHandler);

export default app;
