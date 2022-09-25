/* eslint-disable max-len */
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export interface UserLoginBody {
  username: string
  password: string
}

export const UserLoginSchema = Joi.object<UserLoginBody>({
  username: Joi.string().lowercase().trim().required()
    .messages({
      'string.empty': 'Username is required.',
      'any.required': 'Username is required.'
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.'
    })
});

const VALID_USERNAME_REGEX = /^[\w._-]*$/;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

const PASSWORD_MIN_LENGTH = 8;
const VALID_LOCALES = ['en'];

export interface UserRegisterBody {
  username: string
  password: string
  locale: string
}

export const UserRegisterSchema = Joi.object<UserRegisterBody>({
  username: Joi.string().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH).pattern(VALID_USERNAME_REGEX).lowercase().trim().required()
    .messages({
      'string.min': `Username length must be greater than ${USERNAME_MIN_LENGTH}.`,
      'string.max': `Username length must be less than ${USERNAME_MAX_LENGTH}.`,
      'string.empty': 'Username is required.',
      'any.required': 'Username is required.'
    }),
  password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required()
    .messages({
      'password.minOfSpecialCharacters': 'Password must have at least one special character.',
      'password.minOfLowercase': 'Password must have at least one lowercase letter.',
      'password.minOfUppercase': 'Password must have at least one uppercase letter.',
      'password.noWhiteSpaces': 'Password cannot contain spaces.',
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.'
    }),
  locale: Joi.string().valid(...VALID_LOCALES).required()
    .messages({
      'any.only': `Locale must be one of: ${VALID_LOCALES.join(', ')}.`,
      'string.empty': 'Locale is required.',
      'any.required': 'Locale is required.'
    })
});

export interface UserChangePasswordBody {
  old_password: string
  new_password: string
}

export const UserChangePasswordSchema = Joi.object<UserChangePasswordBody>({
  old_password: Joi.string().required()
    .messages({
      'string.empty': 'Old password is required.',
      'any.required': 'Old password is required.'
    }),
  new_password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required()
    .messages({
      'password.minOfSpecialCharacters': 'New password must have at least one special character.',
      'password.minOfLowercase': 'New password must have at least one lowercase letter.',
      'password.minOfUppercase': 'New password must have at least one uppercase letter.',
      'password.noWhiteSpaces': 'New password cannot contain spaces.',
      'string.empty': 'New password is required.',
      'any.required': 'New password is required.'
    })
});
