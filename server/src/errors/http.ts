import HttpStatus from 'http-status-codes';

export class HttpError extends Error {
  private readonly _statusCode: number;
  private readonly _description: string;

  constructor(message: string, statusCode: number, description: string) {
    super(message);
    this.name = this.constructor.name;
    this._statusCode = statusCode;
    this._description = description;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get description(): string {
    return this._description;
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(message ?? 'An unknown error occurred.', HttpStatus.INTERNAL_SERVER_ERROR, 'Something unexpected happened when handling your request.');
  }
}

export class ResourceNotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'The requested resource was not found by the server.');
  }
}

export class UnauthorizedRequestError extends HttpError {
  constructor(message?: string) {
    super(message ?? 'A bearer token is required to access this endpoint.', HttpStatus.UNAUTHORIZED, 'Please check that you have passed the correct bearer token inside the Authentication header.');
  }
}

export class ModelValidationError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'The data you have provided does not conform with the requirements for this endpoint.');
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'The server could not handle your request. Please verify that your request is correct.');
  }
}

export class AccountLockedError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'Your account is currently locked.');
  }
}

export class WrongCredentialsError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'The credentials provided are incorrect.');
  }
}

export class SchemaValidationError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'The body of this request does not conform to the validation schema.');
  }
}

export class ForbiddenRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN, 'You do not have access to this resource.');
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor(message?: string) {
    super(message ?? 'The server could not handle the request on this endpoint with this method.', HttpStatus.METHOD_NOT_ALLOWED, 'Check the response headers for a list of supported methods on this endpoint.');
  }
}
