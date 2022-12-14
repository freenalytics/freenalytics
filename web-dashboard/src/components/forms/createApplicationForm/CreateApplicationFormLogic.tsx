import React, { Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import OfficialTemplatePicker from '../../common/officialTemplatePicker';
import CreateApplicationFormView from './CreateApplicationFormView';
import useLocale from '../../../hooks/locale';
import { VALID_APPLICATION_TYPES } from '../../../services/api/ApplicationService';
import { CreateApplicationData } from './types';
import { OfficialTemplateForm } from '../../common/officialTemplatePicker/templates';

interface Props {
  onSubmit: SubmitHandler<CreateApplicationData>
}

const CreateApplicationFormLogic: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useLocale();

  const CreateApplicationSchema = Joi.object<CreateApplicationData>({
    name: Joi.string().trim().required()
      .messages({
        'string.empty': t('forms.create_application.errors.fields.name.required'),
        'any.required': t('forms.create_application.errors.fields.name.required')
      }),
    type: Joi.string().valid(...VALID_APPLICATION_TYPES).required()
      .messages({
        'any.only': t('forms.create_application.errors.fields.type.valid', { types: VALID_APPLICATION_TYPES.join(', ') }),
        'string.empty': t('forms.create_application.errors.fields.type.required'),
        'any.required': t('forms.create_application.errors.fields.type.required')
      }),
    schema: Joi.string().trim().required()
      .messages({
        'string.empty': t('forms.create_application.errors.fields.schema.required'),
        'any.required': t('forms.create_application.errors.fields.schema.required')
      }),
    connectors: Joi.array().items(Joi.object({
      package_url: Joi.string().uri().trim().required()
        .messages({
          'string.uri': t('forms.create_application.errors.fields.connectors.package_url.uri'),
          'string.empty': t('forms.create_application.errors.fields.connectors.package_url.required'),
          'any.required': t('forms.create_application.errors.fields.connectors.package_url.required')
        }),
      language: Joi.string().trim().required()
        .messages({
          'string.empty': t('forms.create_application.errors.fields.connectors.language.required'),
          'any.required': t('forms.create_application.errors.fields.connectors.language.required')
        })
    })).default([])
  });

  const form = useForm<CreateApplicationData>({
    mode: 'onSubmit',
    resolver: joiResolver(CreateApplicationSchema)
  });
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (data: CreateApplicationData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleOfficialTemplateSelect = (data: OfficialTemplateForm) => {
    Object.entries(data).forEach(([key, value]) => {
      form.setValue(key as any, value);
      form.clearErrors(key as any);
    });
  };

  return (
    <Fragment>
      <OfficialTemplatePicker onSelect={handleOfficialTemplateSelect} />
      <CreateApplicationFormView form={form} onSubmit={handleSubmit} error={error} />
    </Fragment>
  );
};

export default CreateApplicationFormLogic;
