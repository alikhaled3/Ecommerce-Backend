import express from 'express'
import * as wishlist from './whishList.controler.js'
import { protectedRoute } from '../auth/auth.controler.js'


const wishlistRouter =express.Router()
wishlistRouter.route('/')
.patch(protectedRoute, wishlist.addToWishList)
.delete(protectedRoute, wishlist.removeFromWishList)
.get( wishlist.getAllUserWishList)



export default wishlistRouter