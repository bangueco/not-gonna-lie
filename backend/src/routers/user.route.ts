import express from 'express'
import userController from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/', userController.getUsers)
userRouter.get('/:username', userController.getByUsername)

export default userRouter