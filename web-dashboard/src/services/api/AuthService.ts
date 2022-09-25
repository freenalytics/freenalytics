import Client from './Client';

interface GetRegistrationOpenResponse {
  open: boolean
}

interface PostLoginResponse {
  token: string
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
      throw this.client.createAuthError(error, 'errors.auth.login.message');
    }
  }
}

export default AuthService;
