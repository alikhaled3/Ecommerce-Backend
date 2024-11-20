import slugify from 'slugify'
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"

import { deleteOne } from '../handeler/factor.js';
import { userModel } from '../../../dbconnection/model/user.model.js';
 
const adduser = catchError( async (req ,res ,next)=>{
    const user= new userModel(req.body)

        await user.save()
        res.json({message:"success", user})

    
})

const getAlluser =catchError( async (req ,res ,next)=>{
    const users = await userModel.find()
    
    res.json({message:"success", users})
})

const updateuser =catchError(async (req ,res ,next)=>{
    const {id}=req.params;

   if (req.body.name) req.body.slug=slugify(req.body.name);
    let  user = await userModel.findByIdAndUpdate(id,req.body,{new :true});
    user && res.status(201).json({message:'success', user});
    !user && next( new AppError('user not found',404))
})
const updateuserPassword =catchError(async (req ,res ,next)=>{
    const {id}=req.params;

   if (req.body.name) req.body.slug=slugify(req.body.name);
    let  user = await userModel.findByIdAndUpdate(id,{password:req.body.password},{new :true});
    user && res.status(201).json({message:'success', user});
    !user && next( new AppError('user not found',404))
})

const deleteuser = deleteOne(userModel)

export{
    adduser,getAlluser,updateuser,deleteuser,updateuserPassword
}