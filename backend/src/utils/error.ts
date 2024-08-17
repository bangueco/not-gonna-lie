class BaseError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export class ApiError extends BaseError {
  constructor(status: number, message: string) {
    super(status, message)
    this.name = 'ApiError'
    this.status = status
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends BaseError {
  public field: string

  constructor(status: number, field: string, message: string) {
    super(status, message)
    this.name = 'ValidationError'
    this.status = status
    this.field = field
    Error.captureStackTrace(this, this.constructor)
  }
}