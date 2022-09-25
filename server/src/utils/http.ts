import HttpStatus from 'http-status-codes';
import { HttpError } from '../errors/http';

const FIRST_UNSUCCESSFUL_STATUS_CODE = 400;

export interface CommonBody {
  status: number
  success: boolean
}

export interface DataBody extends CommonBody {
  data: object | string | null
}

export interface ErrorBody extends CommonBody {
  error: {
    name: string,
    description: string,
    message: string
  }
}

export class ResponseBuilder {
  private readonly _body: CommonBody;

  public constructor() {
    this._body = {
      success: true,
      status: HttpStatus.OK
    };
  }

  public withStatusCode(statusCode: number): this {
    this._body.status = statusCode;
    this._body.success = statusCode < FIRST_UNSUCCESSFUL_STATUS_CODE;
    return this;
  }

  public withData(data: object | string): this {
    (this._body as DataBody).data = data;
    return this;
  }

  public withError(error: HttpError): this {
    (this._body as ErrorBody).error = {
      name: error.name,
      description: error.description,
      message: error.message
    };

    return this.withStatusCode(error.statusCode);
  }

  public build(): object {
    if (!('data' in this._body) && !('error' in this._body)) {
      (this._body as DataBody).data = null;
    }

    return this._body;
  }

  get statusCode(): number {
    return this._body.status;
  }
}
