import slugify from 'slugify'
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { brandModel } from '../../../dbconnection/model/brand.schema.js';
import { deleteOne } from './../handeler/factor.js';
 
const addbrand = catchError( async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
    const brand= new brandModel(req.body)
    await brand.save()
    res.json({message:"success", brand})
})

const getAllBrand =catchError( async (req ,res ,next)=>{
    const brands = await brandModel.find()
    res.json({message:"success", brands})
})

const updatebrand =catchError(async (req ,res ,next)=>{
    const {id}=req.params;

   if (req.body.name) req.body.slug=slugify(req.body.name);
    let  brand = await brandModel.findByIdAndUpdate(id,req.body,{new :true});
    brand && res.status(201).json({message:'success', brand});
    !brand && next( new AppError('brand not found',404))
})

const deletebrand = deleteOne(brandModel)

export{
    addbrand,getAllBrand,updatebrand,deletebrand
}