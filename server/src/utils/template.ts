import yml from 'yaml';
import Ajv from 'ajv';

export const generateSchema = (ymlSchema: string): object => {
  const parsed = yml.parse(ymlSchema);

  if (typeof parsed !== 'object') {
    throw new Error('Schema template must be a YML object.');
  }

  const ajv = new Ajv();
  ajv.compile(parsed);

  return parsed;
};
