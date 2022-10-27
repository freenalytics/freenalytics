import Joi from 'joi';

export const PaginationSchema = Joi.object({
  limit: Joi.number().integer().positive().required(),
  current: Joi.number().integer().positive().required(),
  previous: Joi.number().integer().positive().required(),
  next: Joi.number().integer().positive().required(),
  total: Joi.number().integer().positive().required(),
  isLast: Joi.boolean().required()
});
