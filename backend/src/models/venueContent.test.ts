import assert from 'node:assert/strict';
import test from 'node:test';
import mongoose from 'mongoose';
import Event from './Event';
import News from './News';
import Venue from './Venue';
import VenueBooking from './VenueBooking';

const localized = (value: string) => ({ en: value, mr: value });

test('event and news accept non-negative display order for deterministic publishing', () => {
  const event = new Event({
    title: localized('Event'), slug: 'event', description: localized('Description'),
    shortDescription: localized('Short'), date: new Date('2025-09-18'), time: '10:00 AM',
    venue: localized('MACCIA'), location: localized('Mumbai'), featuredImage: '/image.webp',
    eventType: 'recent', status: 'published', category: localized('Business'), displayOrder: 1,
  });
  const news = new News({
    title: localized('News'), slug: 'news', excerpt: localized('Excerpt'), content: localized('Content'),
    category: localized('Business'), featuredImage: '/image.webp', author: 'MACCIA',
    publishDate: new Date('2025-08-09'), status: 'published', displayOrder: 2,
  });
  assert.equal(event.validateSync(), undefined);
  assert.equal(news.validateSync(), undefined);
});

test('venue content and a complete booking request validate', () => {
  const venueId = new mongoose.Types.ObjectId();
  const venue = new Venue({
    _id: venueId, name: localized('K.R. Bedmutha Auditorium'), slug: 'kr-bedmutha-auditorium',
    description: localized('Auditorium'), capacity: 50, hourlyRate: 1, halfDayRate: 1,
    fullDayRate: 1, securityDeposit: 1, idealUsage: localized('Conferences'),
    images: ['/venue.webp'], isActive: true, displayOrder: 0,
  });
  const booking = new VenueBooking({
    fullName: 'Test User', company: 'Test Company', email: 'test@example.com', mobile: '9999999999',
    city: 'Mumbai', venueId, venueName: 'K.R. Bedmutha Auditorium', duration: 'Full Day',
    eventDate: new Date('2030-01-01'), preferredTime: '10:00', attendees: 25,
    description: 'Business conference',
  });
  assert.equal(venue.validateSync(), undefined);
  assert.equal(booking.validateSync(), undefined);
  assert.equal(booking.status, 'pending');
});

test('venue booking schema rejects zero attendees', () => {
  const booking = new VenueBooking({
    fullName: 'Test User', company: 'Test Company', email: 'test@example.com', mobile: '9999999999',
    city: 'Mumbai', venueId: new mongoose.Types.ObjectId(), venueName: 'Venue', duration: 'Full Day',
    eventDate: new Date('2030-01-01'), preferredTime: '10:00', attendees: 0,
    description: 'Business conference',
  });
  assert.ok(booking.validateSync()?.errors.attendees);
});
