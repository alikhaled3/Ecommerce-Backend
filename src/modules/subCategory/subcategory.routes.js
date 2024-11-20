import express from 'express'
import * as subCategoryModel from './subcategory.controler.js'
import {protectedRoute} from '../auth/auth.controler.js'

const subCateyoryRouter =express.Router({mergeParams:true})

subCateyoryRouter.route('/')
.post(protectedRoute,subCategoryModel.addsubCategory)
.get(subCategoryModel.getAllsubCategories)


subCateyoryRouter.route('/:id')
.put(protectedRoute,subCategoryModel.updatasubCategory)
.delete(protectedRoute,subCategoryModel.deletesubCategory)
.get(protectedRoute,subCategoryModel.getsubCategory)

export default subCateyoryRouter