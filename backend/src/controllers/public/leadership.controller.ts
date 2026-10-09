import { Request, Response, NextFunction } from 'express';
import Leadership from '../../models/Leadership';
import Settings from '../../models/Settings';
import { createError } from '../../utils/errorHandler';

export const getPresident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const president = await Leadership.findOne({ type: 'president', isActive: true }).sort({ order: 1 });

    if (!president) {
      const settings = await Settings.findOne();
      if (settings) {
        res.status(200).json({
          success: true,
          data: {
            name: settings.presidentName,
            designation: {
              en: 'President, MACCIA',
              mr: 'अध्यक्ष, MACCIA',
            },
            photo: settings.presidentPhoto,
            bio: { en: settings.presidentMessage.en, mr: settings.presidentMessage.mr },
          },
        });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: president,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLeadership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;
    let query: any = { isActive: true };
    if (type && type !== 'all') {
      query.type = type;
    }

    const leaders = await Leadership.find(query).sort({ order: 1 });
    res.status(200).json({ success: true, data: leaders });
  } catch (error) {
    next(error);
  }
};

export const getLeadershipByType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.params;
    const leaders = await Leadership.find({ type, isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: leaders });
  } catch (error) {
    next(error);
  }
};
