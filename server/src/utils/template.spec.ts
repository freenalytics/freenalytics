import { generateSchema, validateDataWithTemplate } from './template';
import { SchemaValidationError } from '../errors/http';

describe('Utils: Template', () => {
  describe('generateSchema()', () => {
    it('should throw if the given ymlSchema is not a valid JSONSchema.', () => {
      expect(() => {
        generateSchema('hello');
      }).toThrow();

      expect(() => {
        generateSchema('key: value');
      }).toThrow();
    });

    it('should return the JSONSchema object.', () => {
      const ymlString = `
type: object
properties:
  name:
    type: string
  arr:
    type: array
    items:
      type: string
    `;
      const expected = {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          arr: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      };

      expect(generateSchema(ymlString)).toMatchObject(expected);
    });
  });

  describe('validateDataWithTemplate()', () => {
    const template = {
      type: 'object',
      properties: {
        key: {
          type: 'string'
        }
      }
    };

    it('should not throw if data is valid.', () => {
      expect(() => {
        validateDataWithTemplate({ key: 'v' }, template);
      }).not.toThrow();
    });

    it('should throw if data is invalid.', () => {
      expect(() => {
        validateDataWithTemplate({ key: 123 }, template);
      }).toThrow(SchemaValidationError);
    });
  });
});
