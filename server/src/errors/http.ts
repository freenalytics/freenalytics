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
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'Something unexpected happened when handling your request.');
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
