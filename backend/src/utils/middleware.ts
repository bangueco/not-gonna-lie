import { NextFunction, Request, Response } from "express";

const unknownEndPoint = (_request: Request, response: Response, _next: NextFunction) => {
  return response.status(404).json({message: 'Unknown endpoint.'})
}

export default {
  unknownEndPoint
}