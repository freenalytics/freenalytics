import Joi from 'joi';
import Felicity from 'felicity';
import convertSchema from 'joi-to-json';
import { ResponseBuilder } from '../../../src/utils/http';
import { schemaRef } from './refs';
import { SchemaName } from '../../types';

export const APPLICATION_JSON = 'application/json';

export const SECURITY_JWT_NAME = 'bearer_token';
export const SECURITY_JWT_SCHEME = {
  name: 'JWT Access Token',
  description: 'An access token granted by the server on user login.',
  in: 'header',
  type: 'http',
  scheme: 'Bearer',
  bearerFormat: 'JWT'
};

export const generateSchemaComponents = (Schemas: Record<SchemaName, Joi.Schema>) => {
  return Object.entries(Schemas).reduce((acc: object, [key, Schema]: [string, Joi.Schema]) => {
    const convertedSchema = convertSchema(Schema, 'open-api');

    return {
      ...acc,
      [key]: convertedSchema
    };
  }, {});
};

export const generateRequestBodyDescription = (schemaName: string) => {
  return `Request body for ${schemaName}.`;
};

export const generateRequestBodyComponents = (Schemas: Record<SchemaName, Joi.Schema>) => {
  return Object.keys(Schemas).reduce((acc: object, schemaName: string) => {
    return {
      ...acc,
      [schemaName]: {
        description: generateRequestBodyDescription(schemaName),
        content: {
          [APPLICATION_JSON]: {
            schema: {
              $ref: schemaRef(schemaName)
            }
          }
        }
      }
    };
  }, {});
};

export const generateExampleComponents = (Schemas: Record<SchemaName, Joi.Schema>) => {
  return Object.entries(Schemas).reduce((acc: object, [key, Schema]: [string, Joi.Schema]) => {
    return {
      ...acc,
      [key]: {
        value: new ResponseBuilder().withData(Felicity.example(Schema)).build()
      },
      [`${key}-arr`]: {
        value: new ResponseBuilder().withData([Felicity.example(Schema), Felicity.example(Schema), Felicity.example(Schema)]).build()
      }
    };
  }, {});
};

export const generateComponents = (Schemas: Record<SchemaName, Joi.Schema>) => {
  return {
    schemas: generateSchemaComponents(Schemas),
    requestBodies: generateRequestBodyComponents(Schemas),
    examples: generateExampleComponents(Schemas),
    securitySchemes: {
      [SECURITY_JWT_NAME]: SECURITY_JWT_SCHEME
    }
  };
};
