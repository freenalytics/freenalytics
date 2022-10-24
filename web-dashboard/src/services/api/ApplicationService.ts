import Client, { ResponseWithPagination } from './Client';
import { CreateApplicationData } from '../../components/forms/createApplicationForm/types';
import { UpdateApplicationData } from '../../components/forms/applicationSettingsForm/types';

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

export interface GetApplicationDataOptions {
  start: number
  limit: number
}

export interface ApplicationDataModel {
  payload: object
  domain: string
  createdAt: string
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

  private async doPostApplication(data: CreateApplicationData): Promise<ApplicationModel> {
    try {
      const response = await this.client.instance.post('/applications', data);
      return response.data.data;
    } catch (error) {
      this.client.handleRequestError(error);
      throw this.client.createRequestError(error);
    }
  }

  public postApplication() {
    return {
      key: ['applications'],
      fn: (data: CreateApplicationData) => this.doPostApplication(data)
    };
  }

  private async doGetApplicationByDomain(domain: string): Promise<ApplicationModel> {
    try {
      const response = await this.client.instance.get(`/applications/${domain}`);
      return response.data.data;
    } catch (error) {
      this.client.handleRequestError(error);
      throw this.client.createRequestError(error);
    }
  }

  public getApplicationByDomain(domain: string) {
    return {
      key: ['applications', domain],
      fn: () => this.doGetApplicationByDomain(domain)
    };
  }

  private async doPatchApplicationByDomain(domain: string, data: UpdateApplicationData): Promise<ApplicationModel> {
    try {
      const response = await this.client.instance.patch(`/applications/${domain}`, data);
      return response.data.data;
    } catch (error) {
      this.client.handleRequestError(error);
      throw this.client.createRequestError(error);
    }
  }

  public patchApplicationByDomain(domain: string) {
    return {
      key: ['applications', domain],
      fn: (data: UpdateApplicationData) => this.doPatchApplicationByDomain(domain, data)
    };
  }

  private async doGetApplicationDataByDomain(
    domain: string, options: GetApplicationDataOptions
  ): Promise<ResponseWithPagination<ApplicationDataModel[]>> {
    try {
      const response = await this.client.instance.get(`/applications/${domain}/data`, { params: options });
      return response.data.data;
    } catch (error) {
      this.client.handleRequestError(error);
      throw this.client.createRequestError(error);
    }
  }

  public getApplicationDataByDomain(domain: string, options: GetApplicationDataOptions) {
    return {
      key: ['applications', domain, 'data', options],
      fn: () => this.doGetApplicationDataByDomain(domain, options)
    };
  }
}

export default ApplicationService;
