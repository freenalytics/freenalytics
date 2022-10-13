import { Schema, model } from 'mongoose';

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
  domain: string
  type: ApplicationType
  template: TemplateModel
  connectors: ConnectorModel[]
  createdAt: Date
  lastModifiedAt: Date
}

const applicationSchema = new Schema<ApplicationModel>({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  template: {
    raw_schema: {
      type: String,
      required: true
    },
    schema: {
      type: Object,
      required: true
    }
  },
  connectors: {
    type: [{
      package_url: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      },
      _id: false
    }],
    default: []
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastModifiedAt'
  }
});

export default model<ApplicationModel>('Application', applicationSchema);
