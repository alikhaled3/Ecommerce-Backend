import { Schema,model } from "mongoose";
const subCategorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        require:true, 
        trim:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    catrgoryId:{
        type: Schema.ObjectId,
        ref:'category'
    },


},{timestamps:true})
export  const subCategoryModel = model('subCategory',subCategorySchema)