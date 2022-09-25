import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import AuthService from './AuthService';

interface CommonErrorResponse {
  error: {
    name: string
    description: string
    message: string
  }
}

class Client {
  private headers: Record<string, string>;
  private readonly _instance: AxiosInstance;
  private readonly _auth: AuthService;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.headers = {};

    this._instance = axios.create({
      ...config,
      headers: this.headers,
      baseURL
    });

    this._auth = new AuthService(this);
  }

  public setToken(token: string) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`
    };
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...this.headers
    };
  }

  public createRequestError(error: unknown): Error {
    const axiosError = error as AxiosError;
    return new Error((axiosError.response?.data as CommonErrorResponse)?.error?.message ?? axiosError.message);
  }

  get instance() {
    return this._instance;
  }

  get auth() {
    return this._auth;
  }
}

export default Client;
