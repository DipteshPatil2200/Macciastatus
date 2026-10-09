import { Document, Schema, model } from 'mongoose';
export interface IMembershipEnquiry extends Document { fullName:string; companyName:string; mobile:string; email:string; city:string; industry:string; interestedService:string; consent:boolean; fingerprint:string; status:string; }
const MembershipEnquirySchema = new Schema<IMembershipEnquiry>({
  fullName:{type:String,required:true,trim:true,maxlength:120}, companyName:{type:String,required:true,trim:true,maxlength:180},
  mobile:{type:String,required:true,trim:true}, email:{type:String,required:true,trim:true,lowercase:true}, city:{type:String,required:true,trim:true},
  industry:{type:String,required:true,trim:true}, interestedService:{type:String,required:true,trim:true}, consent:{type:Boolean,required:true,validate:{validator:(v:boolean)=>v,message:'Consent is required'}},
  fingerprint:{type:String,required:true,index:true}, status:{type:String,enum:['new','in-progress','resolved','closed'],default:'new'},
}, {timestamps:true});
MembershipEnquirySchema.index({fingerprint:1,createdAt:-1});
export default model<IMembershipEnquiry>('MembershipEnquiry',MembershipEnquirySchema);
