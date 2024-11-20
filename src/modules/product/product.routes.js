import express from 'express'
import * as product from './product.controler.js'
import { uploadMixOfFiles } from '../../fileUpload/multer.js'
import {protectedRoute} from '../auth/auth.controler.js'

const productRouter =express.Router()
let  arrFields = [{name: 'imageCover',maxCount :1},{name : 'images', maxCount : 20}]
productRouter.route('/')
.post(protectedRoute,uploadMixOfFiles(arrFields,'product'),product.addproduct)
.get(product.getAllproduct)


productRouter.route('/:id')
.put(protectedRoute,product.updateproduct)
.delete(protectedRoute,product.deleteproduct)
.get(protectedRoute,product.getproduct)

export default productRouter