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
    nameKey: 'forms.create_application.official_templates.template.official_web.name.text',
    descriptionKey: 'forms.create_application.official_templates.template.official_web.description.text',
    type: 'web',
    schema: `
type: object
properties:
  page_title:
    type: string
  url_route:
    type: string
  user_time_in_page:
    type: number
  user_scrolled:
    type: boolean
  user_first_visit:
    type: boolean
  user_location:
    type: string
  referrer:
    type: string
  num_of_clicks:
    type: integer
  element_clicked:
    type: object
    properties:
      url_route:
        type: string
      tag_name:
        type: string
      class_name:
        type: string
      id:
        type: string
      page_x:
        type: integer
      page_y:
        type: integer
      page_width:
        type: integer
      page_height:
        type: integer
      client_x:
        type: integer
      client_y:
        type: integer
      client_width:
        type: integer
      client_height:
        type: integer
    `.trim(),
    connectors: [{
      language: 'JavaScript',
      package_url: 'https://github.com/freenalytics/freenalytics-connector-web/tree/v1.1.0'
    }]
  }
];

export default templates;
