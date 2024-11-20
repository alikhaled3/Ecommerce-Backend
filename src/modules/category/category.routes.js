import express from 'express'
import * as category from './category.controler.js'
import subCateyoryRouter from '../subCategory/subcategory.routes.js'
import { validate } from '../../midelware/validate.js'
import * as categoryValidat from './category.validation.js'
import { uploadSingleFile } from '../../fileUpload/multer.js'
import { protectedRoute } from '../auth/auth.controler.js'
 
const cateyoryRouter =express.Router()
cateyoryRouter.use('/:categoryId/subcategory',subCateyoryRouter)

cateyoryRouter.post('/',protectedRoute,protectedRoute,uploadSingleFile('image','category'), validate(categoryValidat.addCategoryValidation), category.addCategory)
cateyoryRouter.get('/',category.getAllCategories)
cateyoryRouter.route('/:id')
.put(protectedRoute,validate(categoryValidat.updateCategoryValidation) ,category.updataCategory)
.delete(protectedRoute,validate(categoryValidat.deleteCategoryValidation),category.deleteCategory)
.get(protectedRoute,category.getCategory)

export default cateyoryRouter