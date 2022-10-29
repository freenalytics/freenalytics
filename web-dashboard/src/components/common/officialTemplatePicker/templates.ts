import { ApplicationType, ConnectorModel } from '../../../services/api/ApplicationService';
import { MessageKey } from '../../../i18n';

export interface OfficialTemplateForm {
  type: ApplicationType
  schema: string
  connectors: ConnectorModel[]
}

export interface OfficialTemplate extends OfficialTemplateForm {
  nameKey: MessageKey
  descriptionKey: MessageKey
}

const templates: OfficialTemplate[] = [
  {
    nameKey: 'forms.create_application.official_templates.template.official_web.name',
    descriptionKey: 'forms.create_application.official_templates.template.official_web.description',
    type: 'web',
    schema: `
type: object
properties:
  name:
    type: string
required:
  - name
    `.trim(),
    connectors: [{
      language: 'JavaScript',
      package_url: 'https://github.com/freenalytics'
    }]
  }
];

export default templates;
