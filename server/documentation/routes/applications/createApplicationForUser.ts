import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, SchemaValidationError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications',
  method: 'post',
  summary: 'Create a new application for the requesting user.',
  description: `Create a new application for the requesting user.
  The \`schema\` field in the request body should be a valid JSON Schema that describes the data
  that will be uploaded in the future.`,
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
