import pkg from '../../package.json';
import { DocumentationMetadata, DocumentationInfo } from './types';

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

export default {
  metadata,
  info
};
