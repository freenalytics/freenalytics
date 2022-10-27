import fs from 'fs';
import path from 'path';
import yml from 'yaml';
import documentation from '../documentation';

export const generateSpec = () => {
  return {
    openapi: documentation.metadata.openapi,
    servers: documentation.metadata.servers,
    info: documentation.info,
    tags: {},
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
