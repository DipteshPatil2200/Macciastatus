import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import HomepageMedia from '../../models/HomepageMedia';
import { AuthRequest } from '../../types';
import { createError } from '../../utils/errorHandler';
import { normalizeMediaInput } from '../../utils/mediaValidation';
import { uploadMedia } from '../../config/cloudinary';

export const listHomepageMedia = async (req: AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{
  const page=Math.max(1,Number(req.query.page)||1),limit=Math.min(100,Math.max(1,Number(req.query.limit)||20));
  const query:any={}; if(req.query.status&&req.query.status!=='all')query.status=req.query.status;if(req.query.type&&req.query.type!=='all')query.type=req.query.type;
  const [data,total]=await Promise.all([HomepageMedia.find(query).sort({displayOrder:1,createdAt:-1}).skip((page-1)*limit).limit(limit),HomepageMedia.countDocuments(query)]);
  res.json({success:true,data,pagination:{page,limit,total,pages:Math.ceil(total/limit)}});
}catch(e){next(e)}};
export const getHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{const data=await HomepageMedia.findById(req.params.id);if(!data)return next(createError(404,'Media item not found'));res.json({success:true,data})}catch(e){next(e)}};
export const createHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{const payload=normalizeMediaInput(req.body);const data=await HomepageMedia.create({...payload,createdBy:req.user!.userId});res.status(201).json({success:true,data})}catch(e){next(createError(400,(e as Error).message))}};
export const updateHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{if(!mongoose.isValidObjectId(req.params.id))return next(createError(400,'Invalid media ID'));const payload=normalizeMediaInput(req.body);const data=await HomepageMedia.findByIdAndUpdate(req.params.id,payload,{new:true,runValidators:true});if(!data)return next(createError(404,'Media item not found'));res.json({success:true,data})}catch(e){next(createError(400,(e as Error).message))}};
export const deleteHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{const data=await HomepageMedia.findByIdAndDelete(req.params.id);if(!data)return next(createError(404,'Media item not found'));res.json({success:true,message:'Media item deleted'})}catch(e){next(e)}};
export const reorderHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{const items=Array.isArray(req.body.items)?req.body.items:[];if(!items.length)return next(createError(400,'Ordered items are required'));await HomepageMedia.bulkWrite(items.map((item:any,index:number)=>({updateOne:{filter:{_id:item.id},update:{displayOrder:Number.isFinite(item.displayOrder)?item.displayOrder:index}}})));res.json({success:true,message:'Media order updated'})}catch(e){next(e)}};
export const uploadHomepageMedia = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{try{if(!req.file)return next(createError(400,'Media file is required'));const kind=req.file.mimetype.startsWith('video/')?'video':'image';const uploaded=await uploadMedia(req.file.path,'homepage-media',kind);res.status(201).json({success:true,data:{url:uploaded.url,storageKey:uploaded.publicId,type:kind}})}catch(e){next(e)}};
