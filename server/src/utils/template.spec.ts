import { generateSchema, validateDataWithTemplate, getPathForTemplate } from './template';
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

    it('should throw if data has unknown keys.', () => {
      expect(() => {
        validateDataWithTemplate({ unknown: 123 }, template);
      }).toThrow(SchemaValidationError);
    });
  });

  describe('getPathForTemplate()', () => {
    const schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        phone: {
          type: 'number'
        },
        nested_data: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            subtitle: {
              type: 'string'
            }
          },
          required: [
            'title',
            'subtitle'
          ]
        },
        arr_numbers: {
          type: 'array',
          items: {
            type: 'number'
          }
        }
      },
      required: [
        'name',
        'phone'
      ]
    };

    it('should return an array of the paths for a given schema.', () => {
      const expected = ['name', 'phone', 'nested_data.title', 'nested_data.subtitle', 'arr_numbers'];

      expect(getPathForTemplate(schema)).toMatchObject(expected);
    });
  });
});
