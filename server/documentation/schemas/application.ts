import Joi from 'joi';
import { VALID_APPLICATION_TYPES } from '../../src/models/application';
import { PaginationSchema } from './generic';

export const ApplicationCreateRequestSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid(...VALID_APPLICATION_TYPES).required(),
  schema: Joi.string().required(),
  connectors: Joi.array().items(Joi.object({
    package_url: Joi.string().uri().required(),
    language: Joi.string().required()
  })).default([])
});

export const ApplicationUpdateRequestSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid(...VALID_APPLICATION_TYPES),
  connectors: Joi.array().items(Joi.object({
    package_url: Joi.string().uri().required(),
    language: Joi.string().required()
  }))
});

export const ApplicationDeleteResponseSchema = Joi.object({
  message: Joi.string().required()
});

export const ApplicationResponseSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  domain: Joi.string().required(),
  type: Joi.string().valid(...VALID_APPLICATION_TYPES).required(),
  connectors: Joi.array().items(Joi.object({
    package_url: Joi.string().uri().required(),
    language: Joi.string().required()
  })).required(),
  template: Joi.object({
    raw_schema: Joi.string().required(),
    schema: Joi.object({
      type: Joi.string().valid('object').required(),
      properties: Joi.object().required(),
      required: Joi.array().items(Joi.string()).required()
    }).required()
  }).required(),
  createdAt: Joi.string().isoDate().required(),
  lastModifiedAt: Joi.string().isoDate().required()
});

export const ApplicationDataRequestSchema = Joi.object({
  example: Joi.string().required()
});

export const ApplicationDataResponseSchema = Joi.object({
  domain: Joi.string().required(),
  payload: ApplicationDataRequestSchema
});

export const ApplicationDataPaginatedResponseSchema = Joi.object({
  result: Joi.array().items(ApplicationDataResponseSchema.keys({
    createdAt: Joi.string().isoDate().required()
  })).required(),
  pagination: PaginationSchema.required()
});
