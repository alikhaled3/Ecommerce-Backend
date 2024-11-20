
import { Schema,model } from "mongoose";
const couponSchema = new Schema({
    code:{
        type:String,
        require:true, 
        trim:true
    },
    expires:{
        type:Date,
        require:true, 
  
    },descount:{
        type:Number,
    }

},{timestamps:true})
export  const couponModel = model('coupon',couponSchema)