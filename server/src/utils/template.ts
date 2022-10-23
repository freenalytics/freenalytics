import yml from 'yaml';
import Ajv from 'ajv';
import { SchemaValidationError } from '../errors/http';

export const generateSchema = (ymlSchema: string): object => {
  const parsed = yml.parse(ymlSchema);

  if (typeof parsed !== 'object') {
    throw new Error('Schema template must be a YML object.');
  }

  const ajv = new Ajv();
  ajv.compile(parsed);

  return parsed;
};

export const validateDataWithTemplate = (data: object, template: object) => {
  const ajv = new Ajv();
  const validate = ajv.compile(template);
  const valid = validate(data);

  if (!valid) {
    const error = validate.errors && validate.errors[0];
    const message = `${error!.instancePath} ${error!.message}`;

    throw new SchemaValidationError(message);
  }
};
