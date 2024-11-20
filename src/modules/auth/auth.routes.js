import express from 'express'
import * as validation from './auth.validation.js'
import * as auth from './auth.controler.js'
import { validate } from '../../midelware/validate.js'

const  authRouter = express.Router()

authRouter.post('/signup',validate(validation.signUp),auth.signUp)

authRouter.post('/signin',validate(validation.signIn), auth.signIn)




export default authRouter