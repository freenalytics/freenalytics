import { AxiosError } from 'axios';

export class RequestError extends Error {
  private _originalError: AxiosError;

  constructor(originalError: AxiosError, message: string) {
    super(message);
    this._originalError = originalError;
  }

  public getResponse(): string | null {
    try {
      return JSON.stringify(this._originalError.response?.data, null, 2);
    } catch (error) {
      return null;
    }
  }
}
