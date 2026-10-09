import mongoose, { Schema, Document } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

export interface IVenueBooking extends Document {
  fullName: string;
  company: string;
  email: string;
  mobile: string;
  city: string;
  venueId: mongoose.Types.ObjectId;
  venueName: string;
  duration: string;
  eventDate: Date;
  preferredTime: string;
  attendees: number;
  description: string;
  status: BookingStatus;
  adminNotes?: string;
}

const VenueBookingSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: true },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    venueName: { type: String, required: true },
    duration: { type: String, required: true },
    eventDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    attendees: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IVenueBooking>('VenueBooking', VenueBookingSchema);
