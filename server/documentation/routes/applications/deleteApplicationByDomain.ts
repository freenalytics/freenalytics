import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, ResourceNotFoundError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications/:domain',
  method: 'delete',
  summary: 'Delete an application by domain for the requesting user.',
  description: 'Delete an application by domain for the requesting user.',
  throws: [
    new UnauthorizedRequestError(),
    new ResourceNotFoundError('')
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'ApplicationDeleteResponseSchema'
  },
  pathParams: [
    {
      name: 'domain',
      description: 'The domain of the application to delete.',
      type: 'string'
    }
  ],
  tokenRequired: true
};

export default data;
