import express from 'express'
import * as coupon from './coupon.controler.js'
import { protectedRoute } from '../auth/auth.controler.js'

const couponRouter =express.Router()

couponRouter.route('/')
.post(protectedRoute, coupon.addcoupon)
.get(coupon.getAllcoupon)

couponRouter.route('/:id')
.put(protectedRoute,coupon.updatecoupon)
.delete(protectedRoute,coupon.deletecoupon)
.get(coupon.getcoupon)

export default couponRouter