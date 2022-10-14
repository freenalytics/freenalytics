import { ApplicationType, ConnectorModel } from '../../../services/api/ApplicationService';

export interface CreateApplicationData {
  name: string
  type: ApplicationType
  schema: string
  connectors: ConnectorModel[]
}
