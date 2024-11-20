
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from '../handeler/factor.js';
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { couponModel } from './../../../dbconnection/model/coupon.schema.js';

import qrcode from 'qrcode'
 
const addcoupon= catchError( async (req ,res ,next)=>{


    const result= new couponModel(req.body)
    await result.save()
    res.json({message:"success", result})
})

const getAllcoupon=catchError( async (req ,res ,next)=>{
    let apiFeatures = new ApiFeatures(couponModel.find() , req.query).fields().filter().search().paginate().sort()

    let result = await apiFeatures.mongooseQuery
    res.json({ message:"success",page:apiFeatures.page, result})
})

const getcoupon=catchError( async (req ,res ,next)=>{
    const {id}=req.params
    let coupon =await couponModel.findById(id) 
    let url =await qrcode.toDataURL(coupon.code)
    coupon&& res.status(201).json({message:'success', coupon,url});
    !coupon&& next( new AppError('couponnot found',404))

})

const updatecoupon=catchError(async (req ,res ,next)=>{
    const {id}=req.params;
    let  coupon= await couponModel.findByIdAndUpdate(id,req.body,{new :true});
    coupon&& res.status(201).json({message:'success', coupon});
    !coupon&& next( new AppError('couponnot found',404))
})

const deletecoupon= deleteOne(couponModel)

export{
    addcoupon,getAllcoupon,updatecoupon,deletecoupon,getcoupon
}