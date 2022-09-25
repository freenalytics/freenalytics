import { Schema, ValidationOptions } from 'joi';
import { SchemaValidationError } from '../errors/http';

const defaultValidationOptions: ValidationOptions = {
  convert: true
};

export const validate = <T>(obj: T, schema: Schema, options: ValidationOptions = defaultValidationOptions): T => {
  const { error: validationError, value: validatedData } = schema.validate(obj, options);

  if (validationError) {
    throw new SchemaValidationError(validationError.message);
  }

  return validatedData;
};
