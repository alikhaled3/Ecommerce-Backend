import express from 'express'
import * as review from './review.controler.js'
import { protectedRoute } from '../auth/auth.controler.js'

const reviewRouter =express.Router()

reviewRouter.route('/')
.post(protectedRoute, review.addreview)
.get(review.getAllreview)

reviewRouter.route('/:id')
.put(protectedRoute,review.updatereview)
.delete(protectedRoute,review.deletereview)

export default reviewRouter