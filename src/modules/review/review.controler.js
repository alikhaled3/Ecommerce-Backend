
import { catchError } from "../../utils/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from '../handeler/factor.js';

import { ApiFeatures } from "../../utils/ApiFeatures.js";
import {reviewModel} from '../../../dbconnection/model/review.schema.js'


 
const addreview = catchError( async (req ,res ,next)=>{

    req.body.user = req.user._id
    let isReview = reviewModel.findOne({user:req.user._id ,product: req.body.product})
    if(isReview) return next(new AppError('you already reviewed'))
    const review= new reviewModel(req.body)
    await review.save()
    res.json({message:"success", review})
})

const getAllreview =catchError( async (req ,res ,next)=>{


    let apiFeatures = new ApiFeatures(reviewModel.find() , req.query).fields().filter().search().paginate().sort()

    let result = await apiFeatures.mongooseQuery
    res.json({ message:"success",page:apiFeatures.page, result})


})

const updatereview =catchError(async (req ,res ,next)=>{
    const {id}=req.params;


    let  review = await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new :true});
    review && res.status(201).json({message:'success', review});
    !review && next( new AppError('review not found',404))
})

const deletereview = deleteOne(reviewModel)

export{
    addreview,getAllreview,updatereview,deletereview
}