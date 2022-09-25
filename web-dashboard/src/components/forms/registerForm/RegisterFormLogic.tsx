/* eslint-disable max-len */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import RegisterFormView from './RegisterFormView';
import useLocale from '../../../hooks/locale';
import { RegistrationData } from './types';

const VALID_USERNAME_REGEX = /^[\w._-]*$/;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

const joiPassword = Joi.extend(joiPasswordExtendCore);

interface Props {
  onSubmit: SubmitHandler<RegistrationData>
}

const RegisterFormLogic: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useLocale();

  const RegistrationSchema = Joi.object<RegistrationData>({
    username: Joi.string().min(USERNAME_MIN_LENGTH).max(USERNAME_MAX_LENGTH).pattern(VALID_USERNAME_REGEX).lowercase().trim().required()
      .messages({
        'string.min': t('forms.register.errors.fields.username.min', { value: USERNAME_MIN_LENGTH }),
        'string.max': t('forms.register.errors.fields.username.max', { value: USERNAME_MAX_LENGTH }),
        'string.empty': t('forms.register.errors.fields.username.required'),
        'any.required': t('forms.register.errors.fields.username.required')
      }),
    password: joiPassword.string().min(PASSWORD_MIN_LENGTH).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).noWhiteSpaces().required()
      .messages({
        'password.minOfSpecialCharacters': t('forms.register.errors.fields.password.special_characters'),
        'password.minOfLowercase': t('forms.register.errors.fields.password.lowercase'),
        'password.minOfUppercase': t('forms.register.errors.fields.password.uppercase'),
        'password.noWhiteSpaces': t('forms.register.errors.fields.password.whitespace'),
        'string.empty': t('forms.register.errors.fields.password.required'),
        'any.required': t('forms.register.errors.fields.password.required')
      }),
    passwordConfirm: Joi.any().equal(Joi.ref('password')).required()
      .messages({
        'any.only': t('forms.register.errors.fields.password_confirm.different'),
        'string.empty': t('forms.register.errors.fields.password_confirm.required'),
        'any.required': t('forms.register.errors.fields.password_confirm.required')
      })
  });

  const form = useForm<RegistrationData>({
    mode: 'onSubmit',
    resolver: joiResolver(RegistrationSchema)
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: RegistrationData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <RegisterFormView form={form} onSubmit={handleSubmit} error={error} />
  );
};

export default RegisterFormLogic;
