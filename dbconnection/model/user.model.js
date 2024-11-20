import  { mongoose, Schema,model } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    name:{
        type:String,
        require:true, 
        trim:true
    },
    email:{
        type:String,
        require:true, 
        trim:true,
        unique:true
    },
    password: {
        type:String,
        default:0,
        min:0
    }
    ,role:{
        type:String,
        enum:['admin','user']
       
    }
    ,isActive:{
        type:Boolean,
        default:true
       
    }
    ,verified:{
        type:Boolean,
        default:false
    }
    ,block:{
        type:Boolean,
        default:false
    },
    wishlist:[{type:mongoose.SchemaTypes.ObjectId ,ref:'product'}],
    addresses:[{
        city:String,
        street:String,
        phone:String
    }]


},{timestamps:true})

userSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password,4)
})
userSchema.pre('findOneAndUpdate',function(){
   if(this._update.password)  this._update.password = bcrypt.hashSync(this._update.password,4)
})

export  const userModel = model('user',userSchema)