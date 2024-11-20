import Joi from "joi"
let idValidatiion = Joi.string().hex().length(24).required()
const signUp = Joi.object({
    name:Joi.string().min(3).required(),   
    email:Joi.string().min(3).required().email(),     
    password:Joi.string().min(6).max(20)    
})
const signIn = Joi.object({
    email:Joi.string().min(3).required().email(),     
    password:Joi.string().required()  
})

export {
    signUp,signIn
}

 


















