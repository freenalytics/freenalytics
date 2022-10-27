import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, SchemaValidationError, ResourceNotFoundError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications/:domain/data',
  method: 'post',
  summary: 'Create a new data entry for an application for the requesting user.',
  description: `Create a new data entry for an application for the requesting user.
  The shape of the request body will depend on the schema that was used to create the application.`,
  throws: [
    new UnauthorizedRequestError(),
    new SchemaValidationError(''),
    new ResourceNotFoundError('')
  ],
  success: {
    code: HttpStatus.CREATED,
    schema: 'ApplicationDataResponseSchema'
  },
  pathParams: [
    {
      name: 'domain',
      description: 'The domain of the application to upload the data to.',
      type: 'string'
    }
  ],
  bodySchema: 'ApplicationDataRequestSchema',
  tokenRequired: true
};

export default data;
