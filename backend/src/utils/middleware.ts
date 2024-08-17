import { NextFunction, Request, Response } from "express";
import { ApiError, ValidationError } from "./error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const unknownEndPoint = (_request: Request, response: Response, _next: NextFunction) => {
  return response.status(404).json({message: 'Unknown endpoint.'})
}

const errorHandler = (error: unknown, _request: Request, response: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return response.status(error.status).json({message: error.message})
  } else if (error instanceof ValidationError) {
    return response.status(error.status).json({field: error.field, message: error.message})
  } else if (error instanceof PrismaClientKnownRequestError) {
    return response.status(400).json({message: error.message})
  }

  next(error)
}

export default {
  unknownEndPoint,
  errorHandler
}