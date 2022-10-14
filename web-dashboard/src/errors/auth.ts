import { AxiosError } from 'axios';
import { LocalizedTranslateFunction, MessageKey } from '../i18n';

export class AuthError extends Error {
  private readonly _originalError: AxiosError;
  private readonly _friendlyMessageKey: string;

  constructor(originalError: AxiosError, message: string, friendlyMessageKey: string) {
    super(message);

    this._originalError = originalError;
    this._friendlyMessageKey = friendlyMessageKey;
  }

  public getFriendlyMessage(t: LocalizedTranslateFunction): string | null {
    try {
      return t(this._friendlyMessageKey as MessageKey);
    } catch (error) {
      return null;
    }
  }

  public getResponse(): string | null {
    try {
      return JSON.stringify(this._originalError.response?.data, null, 2);
    } catch (error) {
      return null;
    }
  }
}
