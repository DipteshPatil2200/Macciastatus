import { Request, Response, NextFunction } from 'express';
import MembershipApplication from '../../models/MembershipApplication';
import { createError } from '../../utils/errorHandler';

export const applyMembership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, fullName, email, mobile, address, city, state, pincode, country, agreeToTerms } = req.body;

    // Validation
    if (!category || !fullName || !email || !mobile || !address || !city || !state || !pincode || !country || !agreeToTerms) {
      return next(createError(400, 'All required fields must be provided'));
    }

    const application = await MembershipApplication.create({
      category,
      fullName,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
      country,
      companyName: req.body.companyName,
      businessType: req.body.businessType,
      annualTurnover: req.body.annualTurnover,
      numEmployees: req.body.numEmployees,
      documents: req.body.documents || [],
      agreeToTerms,
    });

    res.status(201).json({
      success: true,
      message: 'Membership application submitted successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
