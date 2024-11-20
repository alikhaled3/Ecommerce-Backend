import express from 'express'
import * as cart from './cart.controler.js'
import { allowedTo, protectedRoute } from '../auth/auth.controler.js'

const cartRouter =express.Router()

cartRouter.route('/')
.post( protectedRoute,cart.addToCart)
.get(protectedRoute,cart.getallCartItem)
cartRouter.post('/applycoupon',protectedRoute,cart.applyCoupon)


cartRouter.route('/:id')
.delete(protectedRoute,cart.removeFromCart)
.put(protectedRoute,cart.updatrQuantity)


export default cartRouter