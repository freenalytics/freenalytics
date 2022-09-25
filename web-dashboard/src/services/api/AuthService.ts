import Client from './Client';

interface GetRegistrationOpenResponse {
  open: boolean
}

class AuthService {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private async doGetRegistrationOpen(): Promise<GetRegistrationOpenResponse> {
    try {
      const response = await this.client.instance.get('/auth/registration-opens');
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
}

export default AuthService;
