import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { ApiError } from "../utils/error";
import { httpStatus } from "../utils/http";
import { comparePassword, hashPassword } from "../utils/lib/hashing";
import { generateAccessToken, generateRefreshToken } from "../utils/lib/token";

const register = async (request: Request, response: Response, next: NextFunction) => {
  
  const {username, password} = request.body

  try {
    // check for fields
    if (!username) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Username field is required.')
    }
  
    if (!password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password field is required.')
    }

    const isExistingUser = await userService.findByUsername(username)

    if (isExistingUser) throw new ApiError(httpStatus.BAD_REQUEST, 'Username exists.')

    // hash password before creating user

    const hashedPassword = await hashPassword(password)

    const credentials = await userService.create(username, hashedPassword)
    return response.status(httpStatus.CREATED).json(credentials)

  } catch (error: unknown) {
    next(error)
  }
}

const login = async (request: Request, response: Response, next: NextFunction) => {
  const {username, password} = request.body

  try {
    // check for fields
    if (!username) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Username field is required.')
    }
  
    if (!password) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password field is required.')
    }

    const isExistingUser = await userService.findByUsername(username)

    if (!isExistingUser) throw new ApiError(httpStatus.BAD_REQUEST, 'Username does not exists.')

    const isPasswordMatch = await comparePassword(password, isExistingUser.password)

    if (!isPasswordMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password.')

    // generate token for user

    const accessToken = generateAccessToken(isExistingUser.id, isExistingUser.username)
    const refreshToken = generateRefreshToken(isExistingUser.id, isExistingUser.username)

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: "none", secure: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return response.status(httpStatus.OK).json({username, token: accessToken})
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login
}