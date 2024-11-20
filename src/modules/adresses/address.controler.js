import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";

import {userModel} from '../../../dbconnection/model/user.model.js'

 


const addToadress =catchError(async (req ,res ,next)=>{

let  result = await userModel.findOneAndUpdate(req.user._id,{$addToSet:{addresses : req.body}},{new :true});
console.log(result);
    result && res.status(201).json({message:'success',result: result.addresses});
    !result && next( new AppError('result not found',404))
})

const removeFromadress =catchError(async (req ,res ,next)=>{

    let  result = await userModel.findOneAndDelete(req.user._id,{$pull:{addresses : {_id:req.body.address}}},{new :true});
    result && res.status(201).json({message:'success',result: result.addresses});
    !result && next( new AppError('result not found',404))
})

const getAllUseradress =catchError(async (req ,res ,next)=>{
let  result = await userModel.findOne({_id:req.user._id})
    result && res.status(201).json({message:'success', result:result.addresses});
    !result && next( new AppError('result not found',404))
})


 
export{addToadress ,removeFromadress,getAllUseradress}