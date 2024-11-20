import mongoose, { model } from "mongoose";
const orderSchema =  mongoose.Schema({
user:{
type:mongoose.Types.ObjectId,ref:'user'
},cartItem:[
    {
        product: {type: mongoose.Types.ObjectId,ref:'product'},
        quantity:Number,
        price:Number
    }
],
totalOrderPrice:Number,
shipingAdress:{
    streat:String ,
    city:String,
    phone:String
},
paymentMethod:{
    type:String,
    enum:['card','cash'],
    default:'cash'
},
isPaid:{
    type:Boolean,
    default:false
},
isDeleverd:{
    type:Boolean,
    default:false
}, 
paidAt:Date
},{timestamps:true})
export  const orderModel = model('order',orderSchema)