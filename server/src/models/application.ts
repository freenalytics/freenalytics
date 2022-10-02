import { Schema, model } from 'mongoose';

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
  template: TemplateModel
  connectors: ConnectorModel[]
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
      }
    }],
    default: []
  }
});

export default model<ApplicationModel>('Application', applicationSchema);
