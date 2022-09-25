import { AxiosError } from 'axios';
import Client from './Client';

interface GetRegistrationOpenResponse {
  open: boolean
}

interface PostLoginResponse {
  token: string
}

interface PostRegisterResponse {
  message: string
}

class AuthService {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private async doGetRegistrationOpen(): Promise<GetRegistrationOpenResponse> {
    try {
      const response = await this.client.instance.get('/auth/registration-open');
      return response.data.data;
    } catch (error) {
      throw this.client.createRequestError(error);
    }
  }

  public getRegistrationOpen() {
    return {
      key: ['registration-open'],
      fn: () => this.doGetRegistrationOpen()
    };
  }

  public async postLogin(username: string, password: string): Promise<PostLoginResponse> {
    try {
      const response = await this.client.instance.post('/auth/login', { username, password });
      return response.data.data;
    } catch (error) {
      throw this.client.createAuthError(error, 'errors.auth.login.default.message');
    }
  }

  public async postRegister(username: string, password: string, locale: string): Promise<PostRegisterResponse> {
    try {
      const response = await this.client.instance.post('/auth/register', { username, password, locale });
      return response.data.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 400) {
        throw this.client.createAuthError(error, 'errors.auth.register.user_exists.message');
      }

      if (axiosError.response?.status === 401) {
        throw this.client.createAuthError(error, 'errors.auth.register.locked.message');
      }

      throw this.client.createAuthError(error, 'errors.auth.register.default.message');
    }
  }
}

export default AuthService;
