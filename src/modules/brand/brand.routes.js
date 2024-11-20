import express from 'express'
import * as brand from './brand.controler.js'
import { protectedRoute } from '../auth/auth.controler.js'

const brandRouter =express.Router()

brandRouter.route('/')
.post(protectedRoute,brand.addbrand)
.get(protectedRoute, brand.getAllBrand)


brandRouter.route('/:id')
.put(protectedRoute,brand.updatebrand)
.delete(protectedRoute,brand.deletebrand)

export default brandRouter