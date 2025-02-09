import mongoose, { model } from "mongoose";
const cartSchema =  mongoose.Schema({
user:{
type:mongoose.Types.ObjectId,ref:'user'
},cartItem:[
    {
        product: {type: mongoose.Types.ObjectId,ref:'product'},
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }
],
totalPrice:Number,
totalPriceAfterDiscount:Number,
discount:Number
 
},{timestamps:true})
export  const cartModel = model('cart',cartSchema)