import { categoryModel } from "../../../dbconnection/model/categore.schema.js"
import slugify from 'slugify'
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handeler/factor.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addCategory= catchError( async (req ,res ,next)=>{
   
    req.body.slug=slugify(req.body.name)
     req.body.image= req.file.filename

    const category= new categoryModel(req.body)
    await category.save()
    res.json({message:"success", category})
})

const getAllCategories =catchError( async (req ,res ,next)=>{
    let apiFeatures = new ApiFeatures(categoryModel.find() , req.query).fields().filter().search().paginate().sort()

    const categories = await categoryModel.find()
    res.json({message:"success",page:apiFeatures.page, categories})
})
const getCategory =catchError( async (req ,res ,next)=>{
    const {id}=req.params
    const categories = await categoryModel.findById(id)
    res.json({message:"success", categories})
})

const updataCategory =catchError(async (req ,res ,next)=>{
    const {id}=req.params;
    const {name}=req.body;
    req.body.slug=slugify(req.body.name);
    let  category = await categoryModel.findByIdAndUpdate(id,req.body,{new :true});
    category && res.status(201).json({message:'success', category});
    !category && next( new AppError('category not found',404))
})

const deleteCategory = deleteOne(categoryModel,'category')


export{
    getCategory,addCategory,getAllCategories,updataCategory,deleteCategory
}