import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, ResourceNotFoundError, SchemaValidationError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications/:domain',
  method: 'patch',
  summary: 'Update an application by domain for the requesting user.',
  description: 'Update an application by domain for the requesting user.',
  throws: [
    new UnauthorizedRequestError(),
    new ResourceNotFoundError(''),
    new SchemaValidationError('')
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'ApplicationResponseSchema'
  },
  pathParams: [
    {
      name: 'domain',
      description: 'The domain of the application to update.',
      type: 'string'
    }
  ],
  bodySchema: 'ApplicationUpdateRequestSchema',
  tokenRequired: true
};

export default data;
