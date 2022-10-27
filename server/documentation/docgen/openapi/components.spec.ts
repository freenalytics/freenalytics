import {
  generateSchemaComponents,
  generateRequestBodyDescription,
  generateRequestBodyComponents,
  generateExampleComponents,
  generateComponents
} from './components';
import * as Joi from 'joi';
import { SchemaName } from '../../types';

const SchemaMock = {
  TestSchema: Joi.object({
    key: Joi.string().required()
  })
} as unknown as Record<SchemaName, Joi.Schema>;

describe('Documentation: Docgen: OpenAPI: Components', () => {
  describe('generateSchemaComponents()', () => {
    it('should return an object with all schemas.', () => {
      const result = generateSchemaComponents(SchemaMock);

      expect(result).toHaveProperty('TestSchema');
    });
  });

  describe('generateRequestBodyDescription()', () => {
    it('should return a string with the request body description.', () => {
      const result = generateRequestBodyDescription('my_schema');

      expect(result).toContain('body for my_schema');
    });
  });

  describe('generateRequestBodyComponents()', () => {
    it('should return an object with all schemas.', () => {
      const result = generateRequestBodyComponents(SchemaMock);

      expect(result).toHaveProperty('TestSchema');
      expect(result).toHaveProperty('TestSchema.description');
      expect(result).toHaveProperty('TestSchema.content');
    });
  });

  describe('generateExampleComponents()', () => {
    it('should return an object with all schemas.', () => {
      const result = generateExampleComponents(SchemaMock);

      expect(result).toHaveProperty('TestSchema');
      expect(result).toHaveProperty('TestSchema-arr');
    });
  });

  describe('generateComponents()', () => {
    it('should return an object with the appropriate properties.', () => {
      const result = generateComponents(SchemaMock);

      expect(result).toHaveProperty('schemas');
      expect(result).toHaveProperty('requestBodies');
      expect(result).toHaveProperty('examples');
      expect(result).toHaveProperty('securitySchemes');
    });
  });
});
