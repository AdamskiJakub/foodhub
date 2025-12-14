import { HTTP_STATUS } from "../constants";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request", details?: unknown) {
    super(HTTP_STATUS.BAD_REQUEST, message, details);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized", details?: unknown) {
    super(HTTP_STATUS.UNAUTHORIZED, message, details);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden", details?: unknown) {
    super(HTTP_STATUS.FORBIDDEN, message, details);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found", details?: unknown) {
    super(HTTP_STATUS.NOT_FOUND, message, details);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Validation Error", details?: unknown) {
    super(HTTP_STATUS.UNPROCESSABLE_ENTITY, message, details);
    this.name = "ValidationError";
  }
}
