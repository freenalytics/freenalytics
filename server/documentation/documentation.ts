import pkg from '../../package.json';
import { DocumentationMetadata, DocumentationInfo } from './types';

import registrationOpen from './routes/auth/registrationOpen';
import register from './routes/auth/register';
import login from './routes/auth/login';
import changePassword from './routes/auth/changePassword';

const metadata: DocumentationMetadata = {
  openapi: '3.0.2',
  servers: [
    { url: 'https://$API_URL' }
  ]
};

const info: DocumentationInfo = {
  title: 'Freenalytics API',
  description: 'This site contains the documentation for the Freenalytics API.',
  version: pkg.version
};

const documentationData = {
  metadata,
  info,
  paths: {
    Auth: {
      registrationOpen,
      register,
      login,
      changePassword
    }
  }
};

export default documentationData;
export type DocumentationData = typeof documentationData;
