import express from 'express'
import * as addresses from './address.controler.js'
import { protectedRoute } from '../auth/auth.controler.js'


const addressesRouter =express.Router()
addressesRouter.route('/')
.patch(protectedRoute, addresses.addToadress)
.delete(protectedRoute, addresses.removeFromadress)
.get( addresses.getAllUseradress)



export default addressesRouter