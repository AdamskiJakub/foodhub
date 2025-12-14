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
    super(400, message, details);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized", details?: unknown) {
    super(401, message, details);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found", details?: unknown) {
    super(404, message, details);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Validation Error", details?: unknown) {
    super(422, message, details);
    this.name = "ValidationError";
  }
}
