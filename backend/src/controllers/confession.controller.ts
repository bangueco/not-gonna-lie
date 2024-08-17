import { NextFunction, Request, Response } from "express";
import confessionService from "../services/confession.service";
import { ApiError } from "../utils/error";
import { httpStatus } from "../utils/http";

const confess = async (request: Request, response: Response, next: NextFunction) => {
  const {confession, id} = request.body

  if (!confession) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Confession field is required.')
  }

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User id not found.')
  }

  try {
    const insertConfession = await confessionService.createConfession(confession, id)
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
  confess,
  deleteConfession
}