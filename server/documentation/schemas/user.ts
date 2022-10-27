import Joi from 'joi';
import { VALID_LOCALES } from '../../src/schemas/user';

export const UserResponseSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  locale: Joi.string().valid(...VALID_LOCALES).required(),
  createdAt: Joi.string().isoDate().required(),
  lastModifiedAt: Joi.string().isoDate().required()
});

export const UserUpdateRequestSchema = Joi.object({
  locale: Joi.string().valid(...VALID_LOCALES)
});
