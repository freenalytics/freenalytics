import fs from 'fs';
import path from 'path';
import yml from 'yaml';
import documentation from '../documentation';
import { generateTags } from './openapi/tags';

export const generateSpec = () => {
  return {
    openapi: documentation.metadata.openapi,
    servers: documentation.metadata.servers,
    info: documentation.info,
    tags: generateTags(documentation),
    paths: {},
    components: {}
  };
};

export const generateSpecFile = (data: object, filePath: string) => {
  const ymlString = yml.stringify(data);

  const dirname = path.dirname(filePath);
  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(filePath, ymlString, { encoding: 'utf-8' });
};
