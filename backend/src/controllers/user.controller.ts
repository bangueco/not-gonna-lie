import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { httpStatus } from "../utils/http";
import { ApiError } from "../utils/error";

const getUsers = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers()

    return response.status(httpStatus.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const getByUsername = async (request: Request, response: Response, next: NextFunction) => {
  const {username} = request.params

  if (!username) throw new ApiError(httpStatus.BAD_REQUEST, 'Username parameter is not defined.')
  
  try {
    const user = await userService.findByUsername(username)

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found.')

    return response.status(httpStatus.OK).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getUsers,
  getByUsername
}