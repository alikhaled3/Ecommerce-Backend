import slugify from 'slugify'
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { subCategoryModel } from './../../../dbconnection/model/subcategore.schema.js';
import { deleteOne } from '../handeler/factor.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';

const addsubCategory= catchError( async (req ,res ,next)=>{
    req.body.slug = slugify(req.body.name)
    const subcategory= new subCategoryModel(req.body)
    await subcategory.save()
    res.json({message:"success", subcategory})
})

const getAllsubCategories =catchError( async (req ,res ,next)=>{
    console.log(req.params);
    let filter ={}
    if(req.params.categoryId)
    {
        filter={category:req.params.categoryId}
    }
       
let apiFeatures = new ApiFeatures(subCategoryModel.find(filter) , req.query).fields().filter().search().paginate().sort()

    const subcategories = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.page, subcategories})
})
const getsubCategory =catchError( async (req ,res ,next)=>{
    const {id}=req.params
    const subcategories = await subCategoryModel.findByIdd(id)
    res.json({message:"success", subcategories})
})

const updatasubCategory =catchError(async (req ,res ,next)=>{
    const {id}=req.params;

   if (req.body.name) req.body.slug=slugify(req.body.name);
    let  subcategory = await subCategoryModel.findByIdAndUpdate(id,req.body,{new :true});
    subcategory && res.status(201).json({message:'success', subcategory});
    !subcategory && next( new AppError('subcategory not found',404))
})

const deletesubCategory = deleteOne(subCategoryModel)


export{
    getsubCategory, addsubCategory,getAllsubCategories,updatasubCategory,deletesubCategory
}