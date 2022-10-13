import Client from './Client';

export const VALID_APPLICATION_TYPES = ['mobile', 'web', 'server', 'desktop', 'other'] as const;
export type ApplicationType = typeof VALID_APPLICATION_TYPES[number];

export interface TemplateModel {
  raw_schema: string
  schema: object
}

export interface ConnectorModel {
  package_url: string
  language: string
}

export interface ApplicationModel {
  name: string
  owner: string
  type: ApplicationType
  domain: string
  template: TemplateModel
  connectors: ConnectorModel[]
  createdAt: string
  lastModifiedAt: string
}

class ApplicationService {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  private async doGetApplications(): Promise<ApplicationModel[]> {
    try {
      const response = await this.client.instance.get('/applications');
      return response.data.data;
    } catch (error) {
      this.client.handleRequestError(error);
      throw this.client.createRequestError(error);
    }
  }

  public getApplications() {
    return {
      key: ['applications'],
      fn: () => this.doGetApplications()
    };
  }
}

export default ApplicationService;
