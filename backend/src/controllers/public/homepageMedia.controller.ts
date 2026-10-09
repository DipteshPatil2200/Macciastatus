import { NextFunction, Request, Response } from 'express';
import HomepageMedia from '../../models/HomepageMedia';
import { publicMediaQuery } from '../../utils/mediaValidation';
export const getPublicHomepageMedia=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{try{const limit=Math.min(30,Math.max(1,Number(req.query.limit)||12));const data=await HomepageMedia.find(publicMediaQuery()).select('-createdBy -storageKey').sort({displayOrder:1,createdAt:-1}).limit(limit).lean();res.json({success:true,data})}catch(e){next(e)}};
