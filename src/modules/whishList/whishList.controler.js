import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

import {userModel} from '../../../dbconnection/model/user.model.js'

 


const addToWishList =catchError(async (req ,res ,next)=>{
const {product}=req.body
console.log(req.user);
let  result = await userModel.findOneAndUpdate(req.user._id,{$addToSet:{wishlist : product}},{new :true});
    result && res.status(201).json({message:'success', result});
    !result && next( new AppError('result not found',404))
})
const removeFromWishList =catchError(async (req ,res ,next)=>{
const {product}=req.body
console.log(req.user);
let  result = await userModel.findOneAndDelete(req.user._id,{$pull:{wishlist : product}},{new :true});
    result && res.status(201).json({message:'success', result});
    !result && next( new AppError('result not found',404))
})
const getAllUserWishList =catchError(async (req ,res ,next)=>{


let  result = await userModel.findOne({_id:req.user._id}).populate('wishlist');
    result && res.status(201).json({message:'success', result:result.wishlist});
    !result && next( new AppError('result not found',404))
})


 
export{addToWishList ,removeFromWishList,getAllUserWishList}