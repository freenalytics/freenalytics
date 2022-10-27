/* eslint-disable max-len */
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { VALID_USERNAME_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, DISALLOWED_USERNAMES, PASSWORD_MIN_LENGTH, VALID_LOCALES } from '../../src/schemas/user';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const RegisterRequestSchema = Joi.object({
  username: Joi.string().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH).disallow(...DISALLOWED_USERNAMES).pattern(VALID_USERNAME_REGEX).lowercase().required(),
  password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required(),
  locale: Joi.string().valid(...VALID_LOCALES).required()
});

export const RegisterResponseSchema = Joi.object({
  message: Joi.string().required()
});

export const LoginRequestSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  password: Joi.string().required()
});

export const LoginResponseSchema = Joi.object({
  token: Joi.string().required()
});

export const RegistrationOpenResponseSchema = Joi.object({
  open: Joi.boolean().required()
});

export const ChangePasswordRequestSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required()
});

export const ChangePasswordResponseSchema = Joi.object({
  message: Joi.string().required()
});
