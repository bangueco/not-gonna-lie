import { NextFunction, Request, Response } from "express";
import confessionService from "../services/confession.service";
import { ApiError } from "../utils/error";
import { httpStatus } from "../utils/http";

const getConfessions = async (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User id not specified.')
  }

  try {
    const userConfessions = await confessionService.getConfessionsForUser(parseInt(id))
    if (!userConfessions) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user id.')
    return response.status(httpStatus.OK).json(userConfessions)
  } catch (error) {
    next(error)
  }
}

const confess = async (request: Request, response: Response, next: NextFunction) => {
  const {confession, userId} = request.body
  
  try {

    if (!confession) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Confession field is required.')
    }
  
    if (!userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User id not found.')
    }

    const insertConfession = await confessionService.createConfession(confession, parseInt(userId))
    return response.status(httpStatus.OK).json(insertConfession)
  } catch (error) {
    next(error)
  }
}

const deleteConfession = async (request: Request, response: Response, next: NextFunction) => {
  const {id} = request.body

  if (!id) throw new ApiError(httpStatus.NOT_FOUND, 'Confession not found.')
  
  try {
    const confession = await confessionService.deleteConfession(id)
    return response.status(httpStatus.NO_CONTENT).json(confession)
  } catch (error) {
    next(error)
  }
}

export default {
  getConfessions,
  confess,
  deleteConfession
}