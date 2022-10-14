import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import ApplicationSettingsFormView from './ApplicationSettingsFormView';
import useLocale from '../../../hooks/locale';
import { VALID_APPLICATION_TYPES } from '../../../services/api/ApplicationService';
import { UpdateApplicationData } from './types';

interface Props {
  onSubmit: SubmitHandler<UpdateApplicationData>
}

const ApplicationSettingsFormLogic: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useLocale();

  const UpdateApplicationSchema = Joi.object<UpdateApplicationData>({
    name: Joi.string().min(1).trim()
      .messages({
        'string.min': t('forms.application_settings.errors.fields.name.min')
      }),
    type: Joi.string().valid(...VALID_APPLICATION_TYPES)
      .messages({
        'any.only': t('forms.application_settings.errors.fields.type.valid', { types: VALID_APPLICATION_TYPES.join(', ') }),
        'string.empty': t('forms.application_settings.errors.fields.type.required'),
        'any.required': t('forms.application_settings.errors.fields.type.required')
      }),
    connectors: Joi.array().items(Joi.object({
      package_url: Joi.string().uri().trim().required()
        .messages({
          'string.uri': t('forms.application_settings.errors.fields.connectors.package_url.uri'),
          'string.empty': t('forms.application_settings.errors.fields.connectors.package_url.required'),
          'any.required': t('forms.application_settings.errors.fields.connectors.package_url.required')
        }),
      language: Joi.string().trim().required()
        .messages({
          'string.empty': t('forms.application_settings.errors.fields.connectors.language.required'),
          'any.required': t('forms.application_settings.errors.fields.connectors.language.required')
        })
    }))
  });

  const form = useForm<UpdateApplicationData>({
    mode: 'onSubmit',
    resolver: joiResolver(UpdateApplicationSchema)
  });
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (data: UpdateApplicationData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  return (
    <ApplicationSettingsFormView form={form} onSubmit={handleSubmit} error={error} />
  );
};

export default ApplicationSettingsFormLogic;
