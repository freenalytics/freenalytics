import { validate } from './schema';
import * as Joi from 'joi';

describe('Utils: Schema', () => {
  describe('validate()', () => {
    const TestSchema = Joi.object({
      field: Joi.string().lowercase().trim().required()
    });

    it('should throw if the validation fails.', () => {
      expect(() => {
        validate({ what: '123' }, TestSchema);
      }).toThrow();
    });

    it('should return the same data that was provided.', () => {
      const initialData = { field: 'some data' };
      const validatedData = validate(initialData, TestSchema, { convert: false });
      expect(validatedData).toStrictEqual(initialData);
    });

    it('should return converted data if convert is set to true.', () => {
      const initialData = { field: 'SOME DATA  ' };
      const expectedData = { field: 'some data' };
      const validatedData = validate(initialData, TestSchema, { convert: true });
      expect(validatedData).toStrictEqual(expectedData);
    });
  });
});
