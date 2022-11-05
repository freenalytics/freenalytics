import { getPathForSchema, getPathWithTypeForSchema } from './schema';

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
        },
        sub_nested: {
          type: 'object',
          properties: {
            value: {
              type: 'boolean'
            }
          }
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

describe('Utils: Schema', () => {
  describe('getPathForSchema()', () => {
    it('should return an array of the paths for a given schema.', () => {
      const expected = ['name', 'phone', 'nested_data.title', 'nested_data.subtitle', 'nested_data.sub_nested.value', 'arr_numbers'];

      expect(getPathForSchema(schema)).toMatchObject(expected);
    });
  });

  describe('getPathWithTypeForSchema()', () => {
    it('should return an object with the correct entries.', () => {
      const expected = {
        name: 'string',
        phone: 'number',
        'nested_data.title': 'string',
        'nested_data.subtitle': 'string',
        'nested_data.sub_nested.value': 'boolean',
        arr_numbers: 'number[]'
      };

      expect(getPathWithTypeForSchema(schema)).toMatchObject(expected);
    });
  });
});
