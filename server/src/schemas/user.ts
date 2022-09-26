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
      'string.empty': 'username is required.',
      'any.required': 'username is required.'
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'password is required.',
      'any.required': 'password is required.'
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
      'string.min': `username length must be greater than ${USERNAME_MIN_LENGTH}.`,
      'string.max': `username length must be less than ${USERNAME_MAX_LENGTH}.`,
      'string.empty': 'username is required.',
      'any.required': 'username is required.'
    }),
  password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required()
    .messages({
      'password.minOfSpecialCharacters': 'password must have at least one special character.',
      'password.minOfLowercase': 'password must have at least one lowercase letter.',
      'password.minOfUppercase': 'password must have at least one uppercase letter.',
      'password.noWhiteSpaces': 'password cannot contain spaces.',
      'string.empty': 'password is required.',
      'any.required': 'password is required.'
    }),
  locale: Joi.string().valid(...VALID_LOCALES).required()
    .messages({
      'any.only': `locale must be one of: ${VALID_LOCALES.join(', ')}.`,
      'string.empty': 'locale is required.',
      'any.required': 'locale is required.'
    })
});

export interface UserChangePasswordBody {
  old_password: string
  new_password: string
}

export const UserChangePasswordSchema = Joi.object<UserChangePasswordBody>({
  old_password: Joi.string().required()
    .messages({
      'string.empty': 'old_password is required.',
      'any.required': 'old_password is required.'
    }),
  new_password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required()
    .messages({
      'password.minOfSpecialCharacters': 'new_password must have at least one special character.',
      'password.minOfLowercase': 'new_password must have at least one lowercase letter.',
      'password.minOfUppercase': 'new_password must have at least one uppercase letter.',
      'password.noWhiteSpaces': 'new_password cannot contain spaces.',
      'string.empty': 'new_password is required.',
      'any.required': 'new_password is required.'
    })
});
