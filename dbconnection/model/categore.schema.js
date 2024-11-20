import { Schema,model } from "mongoose";
const categorySchema = new Schema({
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
    image:{
        type:String
    }


},{timestamps:true})

categorySchema.post('init',function(doc){
    doc.image = process.env.BASEURL +'category/'+ doc.image
})
export  const categoryModel = model('category',categorySchema)