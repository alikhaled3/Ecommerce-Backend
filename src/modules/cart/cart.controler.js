import { couponModel } from "../../../dbconnection/model/coupon.schema.js";
import { porductModel } from "../../../dbconnection/model/product.schema.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/catchError.js"
import { cartModel } from './../../../dbconnection/model/cart.schema.js';

function clcTotalPrice(cart){
    let totalPrice = 0;
    cart.cartItem.forEach(elm =>{
        totalPrice += elm.quantity * elm.price
    })
    cart.totalPrice= totalPrice
} 

const getallCartItem=catchError(async(req,res,next)=>{
    let cart =await cartModel.findOne({user :req.user._id}).populate('cartItem.product')
    res.json({message:'success',cart})
})

const addToCart = catchError( async (req ,res ,next)=>{
    let product = await porductModel.findById(req.body.product).select('price')
    if(!product )return next(new AppError('product not found'),404)
    req.body.price =product.price
let isCartExist =await cartModel.findOne({user :req.user._id})

   if(!isCartExist)
    {
        let cart =new cartModel({
            user:req.user._id,
            cartItem:[req.body]
        });
        await cart.save()
        res.json({message:"success", cart})
        clcTotalPrice(isCartExist)
    }
    let item = isCartExist.cartItem.find(elm=>elm.product == req.body.product)
    if(item){
        item.quantity += req.body.quantity ||1
    }else{
        isCartExist.cartItem.push(req.body)
    }
    clcTotalPrice(isCartExist)
    await isCartExist.save()
    return res.json({message:'add to cart',cart :isCartExist})
})

const removeFromCart =catchError(async (req ,res ,next)=>{

    let  result = await cartModel.findOneAndUpdate( {user : req.user._id},{$pull:{cartItem : {_id:req.params.id}}},{new :true});
    !result && next( new AppError('item  not found',404))
    clcTotalPrice(result)
    result && res.status(201).json({message:'item removed success',cart: result});
})

const applyCoupon= catchError(async (req,res,next)=>{
    let code = await couponModel.findOne({code:req.body.code})
    let cart = await cartModel.findOne({user:req.user._id})
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.dicount)/100
    await cart.save()
    res.status(201).json({message : 'success',cart})

})

const updatrQuantity = catchError( async (req ,res ,next)=>{
    let product = await porductModel.findById(req.params.id).select('price')
    if(!product )return next(new AppError('product not found'),404)

    let isCartExist =await cartModel.findOne({user :req.user._id})


    let item = isCartExist.cartItem.find(elm=>elm.product == req.params.id)
    if(item){
        item.quantity = req.body.quantity 
    }
    clcTotalPrice(isCartExist)
    await isCartExist.save()
    return res.json({message:'success',cart :isCartExist})
})
export{
    removeFromCart,
    addToCart,
    getallCartItem,
    applyCoupon,
    updatrQuantity
}