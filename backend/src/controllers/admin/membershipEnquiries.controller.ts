import {NextFunction,Request,Response} from 'express';import MembershipEnquiry from '../../models/MembershipEnquiry';
export const listMembershipEnquiries=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{try{const data=await MembershipEnquiry.find().select('-fingerprint').sort({createdAt:-1});res.json({success:true,data})}catch(e){next(e)}};
