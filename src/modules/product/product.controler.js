import slugify from 'slugify';
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from './../handeler/factor.js';
import { porductModel } from './../../../dbconnection/model/product.schema.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';
import { mongoose } from 'mongoose';

 
const addproduct = catchError( async (req ,res ,next)=>{

    req.body.imageCover= req.files.imageCover[0].filename
    req.body.images= req.files.images.map(elm => elm.filename)
    req.body.slug = slugify(req.body.title)
    const product= new porductModel(req.body)
    await product.save()
    res.json({message:"success", product})
})

const getAllproduct =catchError( async (req ,res ,next)=>{
let apiFeatures = new ApiFeatures(porductModel.find() , req.query).fields().filter().search().paginate().sort()

    let result = await apiFeatures.mongooseQuery
    res.json({ message:"success",page:apiFeatures.page, result})
})


const getproduct =catchError( async (req ,res ,next)=>{
    const {id}= req.params
    const products = await porductModel.findOne(id)
    res.json({message:"success", products})
})

const updateproduct =catchError(async (req ,res ,next)=>{
    const {id}=req.params;

   if (req.body.title) req.body.slug=slugify(req.body.title);
    let  product = await porductModel.findByIdAndUpdate(id,req.body,{new :true});
    product && res.status(201).json({message:'success', product});
    !product && next( new AppError('product not found',404))
})

const deleteproduct = deleteOne(porductModel)

export{
    addproduct,getAllproduct,updateproduct,deleteproduct,getproduct
}