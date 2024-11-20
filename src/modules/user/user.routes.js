import express from 'express'
import * as user from './user.controler.js'

const userRouter =express.Router()

userRouter.route('/')
.post(user.adduser)
.get(user.getAlluser)


userRouter.route('/:id')
.put(user.updateuser)
.delete(user.deleteuser)
.patch(user.updateuserPassword)

export default userRouter