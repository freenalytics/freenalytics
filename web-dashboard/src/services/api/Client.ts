import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import EventEmitter from 'events';
import AuthService from './AuthService';
import { RequestError } from '../../errors/http';
import { AuthError } from '../../errors/auth';

interface CommonErrorResponse {
  error: {
    name: string
    description: string
    message: string
  }
}

class Client extends EventEmitter {
  private headers: Record<string, string>;
  private readonly _instance: AxiosInstance;
  private readonly _auth: AuthService;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    super();
    this.headers = {};

    this._instance = axios.create({
      ...config,
      headers: this.headers,
      baseURL
    });

    this._auth = new AuthService(this);
  }

  public setToken(token: string | null) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`
    };
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...this.headers
    };
  }

  public handleRequestError(error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      this.emit('invalidated');
    }
  }

  public createRequestError(error: unknown): Error {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as CommonErrorResponse)?.error?.message ?? axiosError.message;
    return new RequestError(axiosError, message);
  }

  public createAuthError(error: unknown, friendlyMessageKey: string): Error {
    const axiosError = error as AxiosError;
    const message = (axiosError.response?.data as CommonErrorResponse)?.error?.message ?? axiosError.message;
    return new AuthError(axiosError, message, friendlyMessageKey);
  }

  get instance() {
    return this._instance;
  }

  get auth() {
    return this._auth;
  }
}

export default Client;
