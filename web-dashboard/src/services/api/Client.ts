import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import EventEmitter from 'events';
import { RequestError } from '../../errors/http';
import { AuthError } from '../../errors/auth';
import AuthService from './AuthService';
import ApplicationService from './ApplicationService';

export interface CommonErrorResponse {
  error: {
    name: string
    description: string
    message: string
  }
}

export interface PaginationData {
  limit: number
  current: number
  previous: number
  next: number
  total: number
  isLast: boolean
}

export interface ResponseWithPagination<T> {
  result: T
  pagination: PaginationData
}

class Client extends EventEmitter {
  private headers: Record<string, string>;
  private readonly _baseURL: string;
  private readonly _instance: AxiosInstance;
  private readonly _auth: AuthService;
  private readonly _application: ApplicationService;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    super();
    this.headers = {};
    this._baseURL = baseURL;

    this._instance = axios.create({
      ...config,
      headers: this.headers,
      baseURL
    });

    this._auth = new AuthService(this);
    this._application = new ApplicationService(this);
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

    if (axiosError.response?.status === 401 && (axiosError.response?.data as CommonErrorResponse).error?.message === 'jwt expired') {
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

  get baseURL() {
    return this._baseURL;
  }

  get instance() {
    return this._instance;
  }

  get auth() {
    return this._auth;
  }

  get application() {
    return this._application;
  }
}

export default Client;
