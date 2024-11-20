import Joi from "joi"
let idValidatiion = Joi.string().hex().length(24).required()
const addCategoryValidation = Joi.object({
    name:Joi.string().min(3).required(),   
})
const updateCategoryValidation = Joi.object({
    name: Joi.string().min(3),
    id:idValidatiion
})
const deleteCategoryValidation = Joi.object({
    id :idValidatiion
})
export {
    addCategoryValidation,updateCategoryValidation,deleteCategoryValidation
}

 


















