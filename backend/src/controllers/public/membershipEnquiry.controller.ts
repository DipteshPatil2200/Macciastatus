import { NextFunction, Request, Response } from 'express';
import MembershipEnquiry from '../../models/MembershipEnquiry';
import { createError } from '../../utils/errorHandler';
import { membershipEnquiryFingerprint } from '../../utils/mediaValidation';

export const submitMembershipEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { fullName, companyName, mobile, email, city, industry, interestedService, consent, website } = req.body;
    if (website) {
      res.status(201).json({ success: true, message: 'Thank you. Your request has been received.' });
      return;
    }
    if (!fullName || !companyName || !mobile || !email || !city || !industry || !interestedService || consent !== true) {
      return next(createError(400, 'All fields and consent are required'));
    }
    const fingerprint = membershipEnquiryFingerprint(email, mobile, interestedService);
    const duplicate = await MembershipEnquiry.exists({ fingerprint, createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    if (duplicate) return next(createError(409, 'A matching enquiry was received recently. The membership team will contact you.'));
    const data = await MembershipEnquiry.create({ fullName, companyName, mobile, email, city, industry, interestedService, consent, fingerprint });
    res.status(201).json({ success: true, message: 'Thank you. The MACCIA membership team will contact you.', data: { _id: data._id } });
  } catch (error) {
    next(error);
  }
};
