import { userModel } from "../../../dbconnection/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signUp = catchError(async (req,res ,next )=>{
        const isUser = await userModel.findOne({email :req.body.email})

        if(isUser) return next( new AppError('account is already exist',409))
            
        
        const user =new userModel(req.body)
           await user.save()
           let token = jwt.sign({email:user.email ,name:user.name,id:user._id, role:user.role},'mynameisalikhaledomar')
            res.status(201).json({message:'success',token})
        
})
const signIn = catchError(async (req,res ,next )=>{
  const {email, password}=req.body
    const user = await userModel.findOne({email})
        if(!user || !bcrypt.compareSync(password, user.password)) 
        return  next( new AppError('incorrect password or email',409))    
        let token = jwt.sign({email:user.email ,name:user.name,id:user._id, role:user.role},'mynameisalikhaledomar')
        res.status(201).json({message:'success',token})
})

 const  protectedRoute =catchError(async (req,res ,next )=>{
    let {token}= req.headers
    if(!token)return next(new AppError('TOKEN NOT PROVIDED'))

    let decoded =await jwt.verify(token, 'mynameisalikhaledomar')

    let user =await userModel.findById(decoded.id)

    if(!user) return next(new AppError('TOKEN NOT PROVIDED')) 
  req.user =user
    next()
})
 const allowedTo =(...roles)=>
{
    return catchError(async(req,res,next)=>{
        if (!roles.includes(req.user.role))
        return next(new AppError('you are not authrizd to access this route .you are')) 
    })
}


export {signUp,signIn,protectedRoute,allowedTo}