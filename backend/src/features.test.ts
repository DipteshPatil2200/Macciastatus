import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import HomepageMedia from './models/HomepageMedia';
import MemberBusiness from './models/MemberBusiness';
import BusinessOpportunity from './models/BusinessOpportunity';
import { adminOnly } from './middleware/auth';
import { isAllowedMediaUpload, isInstagramUrl, matchesMemberFilters, membershipEnquiryFingerprint, normalizeMediaInput, parseYouTubeId, publicMediaQuery } from './utils/mediaValidation';

const userId = new mongoose.Types.ObjectId();

test('admin media creation validates a complete record', () => {
  const item = new HomepageMedia({ title:'Industry briefing',type:'youtube',sourceUrl:'https://youtu.be/dQw4w9WgXcQ',platformMediaId:'dQw4w9WgXcQ',createdBy:userId });
  assert.equal(item.validateSync(), undefined);
});
test('YouTube standard URL validation extracts the video id',()=>assert.equal(parseYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),'dQw4w9WgXcQ'));
test('YouTube Shorts URL validation extracts the video id',()=>assert.equal(parseYouTubeId('https://youtube.com/shorts/dQw4w9WgXcQ'),'dQw4w9WgXcQ'));
test('Instagram post and Reel URLs are accepted',()=>{assert.equal(isInstagramUrl('https://www.instagram.com/p/ABC_123/'),true);assert.equal(isInstagramUrl('https://instagram.com/reel/ABC-123/'),true)});
test('invalid social URLs are rejected',()=>{assert.equal(parseYouTubeId('https://example.com/watch?v=dQw4w9WgXcQ'),null);assert.equal(isInstagramUrl('https://example.com/p/ABC'),false);assert.throws(()=>normalizeMediaInput({type:'youtube',sourceUrl:'invalid'}))});
test('published media status is schema-valid',()=>{const item=new HomepageMedia({title:'Published',type:'uploaded_image',sourceUrl:'https://cdn.example.com/image.webp',status:'published',createdBy:userId});assert.equal(item.validateSync(),undefined)});
test('public media query prevents draft visibility while allowing eligible schedules',()=>{const query=publicMediaQuery();assert.equal(query.$or.some(branch=>branch.status==='draft'),false);assert.equal(query.$or.some(branch=>branch.status==='published'),true)});
test('media display order accepts non-negative values',()=>{const item=new HomepageMedia({title:'Ordered',type:'uploaded_image',status:'draft',displayOrder:2,createdBy:userId});assert.equal(item.validateSync(),undefined);item.displayOrder=-1;assert.ok(item.validateSync()?.errors.displayOrder)});
test('upload validation accepts matching safe image and video types',()=>{assert.equal(isAllowedMediaUpload('video/mp4','briefing.mp4'),true);assert.equal(isAllowedMediaUpload('image/webp','logo.webp'),true)});
test('upload validation rejects mismatched extension and executable content',()=>{assert.equal(isAllowedMediaUpload('video/mp4','briefing.exe'),false);assert.equal(isAllowedMediaUpload('application/x-msdownload','media.mp4'),false)});
test('role-based access permits administrators',()=>{let called=false;adminOnly({user:{role:'admin'}} as any,{} as any,()=>{called=true});assert.equal(called,true)});
test('role-based access rejects non-admin users',()=>{let error:any;adminOnly({user:{role:'member'}} as any,{} as any,(value?:any)=>{error=value});assert.equal(error?.statusCode,403)});
test('member directory filtering matches search, industry and city',()=>assert.equal(matchesMemberFilters({companyName:'Konkan Exports',industry:'Trade',city:'Mumbai',description:'Food exporter'},'export','Trade','Mumbai'),true));
test('member business requires public consent independently of publication',()=>{const item=new MemberBusiness({companyName:'Example',slug:'example',industry:'Trade',city:'Mumbai',description:'Approved profile',approvalStatus:'approved',published:true,contactConsent:false});assert.equal(item.validateSync(),undefined);assert.equal(item.contactConsent,false)});
test('opportunity publication and expiry fields validate',()=>{const item=new BusinessOpportunity({title:'Supplier requirement',category:'supplier-requirement',industry:'Manufacturing',city:'Pune',description:'Seeking approved suppliers',status:'published',closingDate:new Date(Date.now()+86400000)});assert.equal(item.validateSync(),undefined)});
test('opportunity card fields persist valid image, detail link and order',()=>{const item=new BusinessOpportunity({title:'Export partner',category:'export-opportunity',industry:'Food',city:'Nashik',description:'Seeking overseas distributors',imageUrl:'https://cdn.example.com/export.webp',detailUrl:'/contact',displayOrder:3});assert.equal(item.validateSync(),undefined);assert.equal(item.displayOrder,3)});
test('opportunity card rejects insecure external image links',()=>{const item=new BusinessOpportunity({title:'Export partner',category:'export-opportunity',industry:'Food',city:'Nashik',description:'Seeking overseas distributors',imageUrl:'http://example.com/export.webp'});assert.ok(item.validateSync()?.errors.imageUrl)});
test('membership enquiry duplicate fingerprint is normalized',()=>assert.equal(membershipEnquiryFingerprint(' Test@Example.com ','+91 98765-43210',' Membership '),'test@example.com|919876543210|membership'));
