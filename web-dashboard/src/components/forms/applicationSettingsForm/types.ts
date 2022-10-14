import { ApplicationType, ConnectorModel } from '../../../services/api/ApplicationService';

export interface UpdateApplicationData {
  name: string
  type: ApplicationType
  connectors: ConnectorModel[]
}
