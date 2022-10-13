import Joi from 'joi';
import { ApplicationType, VALID_APPLICATION_TYPES } from '../models/application';

export interface ApplicationCreateBody {
  name: string
  type: ApplicationType
  schema: string
  connectors?: {
    package_url: string,
    language: string
  }[]
}

export const ApplicationCreateSchema = Joi.object<ApplicationCreateBody>({
  name: Joi.string().trim().required()
    .messages({
      'string.empty': 'name is required.',
      'any.required': 'name is required.'
    }),
  type: Joi.string().valid(...VALID_APPLICATION_TYPES).required()
    .messages({
      'any.only': `type must be one of: ${VALID_APPLICATION_TYPES.join(', ')}`
    }),
  schema: Joi.string().trim().required()
    .messages({
      'string.empty': 'schema is required.',
      'any.required': 'schema is required.'
    }),
  connectors: Joi.array().items(Joi.object({
    package_url: Joi.string().uri().trim().required()
      .messages({
        'string.uri': 'connectors.package_url must be a URL.',
        'string.empty': 'connectors.package_url is required.',
        'any.required': 'connectors.package_url is required.'
      }),
    language: Joi.string().trim().required()
      .messages({
        'string.empty': 'connectors.language is required.',
        'any.required': 'connectors.language is required.'
      })
  })).default([])
});

export interface ApplicationUpdateBody {
  name?: string
  type?: ApplicationType
  connectors?: {
    package_url: string,
    language: string
  }[]
}

export const ApplicationUpdateSchema = Joi.object<ApplicationUpdateBody>({
  name: Joi.string().min(1).trim()
    .messages({
      'string.min': 'name cannot be empty.'
    }),
  type: Joi.string().valid(...VALID_APPLICATION_TYPES)
    .messages({
      'any.only': `type must be one of: ${VALID_APPLICATION_TYPES.join(', ')}`
    }),
  connectors: Joi.array().items(Joi.object({
    package_url: Joi.string().uri().trim().required()
      .messages({
        'string.uri': 'connectors.package_url must be a URL.',
        'string.empty': 'connectors.package_url is required.',
        'any.required': 'connectors.package_url is required.'
      }),
    language: Joi.string().trim().required()
      .messages({
        'string.empty': 'connectors.language is required.',
        'any.required': 'connectors.language is required.'
      })
  }))
});
