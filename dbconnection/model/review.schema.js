import { Schema,model } from "mongoose";
const reviewSchema = new Schema({
    text:{
        type:String,
        require:true, 
        trim:true
    },
    product:{
        type:Schema.ObjectId,
        require:true, 
        ref:'product'
    },
    user: {
        type:Schema.ObjectId,
        ref:'user',
        require:true, 
    }
    ,rate:{
        type:Number,
        enum:[1,2,3,4,5]
    }

},{timestamps:true})

reviewSchema.pre(/^find/,function(){
this.populate('user', 'name')
})

export  const reviewModel = model('review',reviewSchema)