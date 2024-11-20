import { Schema,model } from "mongoose";
const productSchema = new Schema({
    title:{
        type:String,
        unique:true,
        require:true, 
        trim:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    price: {
        type:Number,
        default:0,
        min:0
    }
    ,priceAfterDescount:{
        type:Number,
        default:0,
        min:0
    }, 
    description :{
        type:String,
        maxlenght:[100,'des'],
        minlenght:[10,'des'],
        require:true,
        trip:true,

    },stock:{
        type:Number,
        default:0,
        min:0
    },sold:{
        type:Number,
        default:0,
        min:0
    },imageCover:{
        type:String,
        
    },images:{
        type:[String],
    },category:{
        type:Schema.ObjectId,
        ref:"category"
    },subcategory:{
        type:Schema.ObjectId,
        ref:"subCategory"
    },brand:{
        type:Schema.ObjectId,
        ref:"brand"
    },ratingAvg:{
        type:Number,
        min:1,
        max:5
    },ratingCount:{
        type:Number,
        min:1
    
    }
},{timestamps:true ,toJSON:{virtuals:true}})

productSchema.post('init',function(doc){
    if( doc.imageCover && doc.images){
        doc.imageCover = 'http://localhost:3000/' + 'product/' + doc.imageCover
        doc.images = doc.images.map(elm=>  'http://localhost:3000/' + 'product/' + elm )

    }
})

productSchema.virtual('mayReviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product'
})

productSchema.pre(/^find/,function(){
    this.populate('mayReviews')
    })

export  const porductModel = model('product',productSchema)