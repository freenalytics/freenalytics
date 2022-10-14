import { generateSchema } from './template';

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
  });

  describe('should return the JSONSchema object.', () => {
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
