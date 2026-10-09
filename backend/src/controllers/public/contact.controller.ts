import { Request, Response, NextFunction } from 'express';
import ContactEnquiry from '../../models/ContactEnquiry';
import { createError } from '../../utils/errorHandler';

export const submitContactForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, phone, subject, message, enquiryType } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return next(createError(400, 'Required fields missing'));
    }

    const enquiry = await ContactEnquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      enquiryType: enquiryType || 'general',
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const Settings = (await import('../../models/Settings')).default;
    const Office = (await import('../../models/Office')).default;

    const settings = await Settings.findOne();
    const offices = await Office.find({ isActive: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: {
        settings,
        offices,
      },
    });
  } catch (error) {
    next(error);
  }
};
