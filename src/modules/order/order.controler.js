
import { catchError } from "../../utils/catchError.js"
import { cartModel } from '../../../dbconnection/model/cart.schema.js';
import { orderModel } from "../../../dbconnection/model/order.schema.js";
import {porductModel} from '../../../dbconnection/model/product.schema.js'
import Stripe from "stripe";
const stripe = new Stripe('sk_test_...')

const createCashOrder = catchError( async (req ,res ,next)=>{
    // const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount:cart.totalPrice
let cart = await cartModel.findById(req.params.id)
if(cart){
    const order =new orderModel({
    user:req.user.id,
    cartItem:cart.cartItem,
    totalPrice:cart.totalPrice,
    shipingAdress:req.body.shipingAdress,
})

await order.save()

if(order){
    let options =cart.cartItem.map(item=>({
        updateOne:{
            filter:{_id:item.product},
            update:{$inc:{quantity : -item.quantity,sold: item.quantity}}
        }
    }))
    
    await porductModel.bulkWrite(options)
    
    await cartModel.findByIdAndDelete(req.params.id)
}
return res.json({message:"success",order})
}else{
    res.json({message : 'empty cart'})
}

})

const getSpecificOrder=catchError(async(req,res,next)=>{
    const order =await orderModel.findOne({user:req.user._id}).populate('cartItem.product')
    console.log(order);
    res.status(200).json({message:'success',order})
})
const getAllOrder = catchError(async(req,res,next)=>{
    const orders =await orderModel.find({}).populate('cartItem.product')
    res.status(200).json({message:'success',orders})
})
const createCheckOutSesion = catchError(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id)

let session = await stripe.checkout.sessions.create({
    line_items:[
        {
            price_data:{
                currency:'egp',
                unit_amount:cart.totalPrice *100,
                product_data:{
                name:req.user.name
                }

            },
            quantity:1
        }
    ],
    mode:'payment',
    success_url:'',
    cancel_url:'',
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shipingAdress
})
res.json({message:'success',session})
})


export{
    createCashOrder,getSpecificOrder,getAllOrder,createCheckOutSesion

}