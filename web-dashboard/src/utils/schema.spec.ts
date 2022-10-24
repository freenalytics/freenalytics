import { getPathForSchema } from './schema';

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

describe('Utils: Schema', () => {
  describe('getPathForSchema()', () => {
    it('should return an array of the paths for a given schema.', () => {
      const expected = ['name', 'phone', 'nested_data.title', 'nested_data.subtitle', 'arr_numbers'];

      expect(getPathForSchema(schema)).toMatchObject(expected);
    });
  });
});
