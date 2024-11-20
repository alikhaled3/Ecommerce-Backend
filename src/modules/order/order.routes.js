import express from 'express'
import * as order from './order.controler.js'
import {  protectedRoute } from '../auth/auth.controler.js'

const orderRouter =express.Router()

orderRouter.route('/')
.get( protectedRoute,order.getSpecificOrder) 

orderRouter.get('/all',order.getAllOrder)
orderRouter.get('/checkout/:id',protectedRoute,order.createCheckOutSesion)


orderRouter.route('/:id')
.post(protectedRoute,order.createCashOrder)



export default orderRouter