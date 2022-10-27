import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, SchemaValidationError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications',
  method: 'post',
  summary: 'Create a new application for the requesting user.',
  description: 'Create a new application for the requesting user.',
  throws: [
    new UnauthorizedRequestError(),
    new SchemaValidationError('')
  ],
  success: {
    code: HttpStatus.CREATED,
    schema: 'ApplicationResponseSchema'
  },
  bodySchema: 'ApplicationCreateRequestSchema',
  tokenRequired: true
};

export default data;
