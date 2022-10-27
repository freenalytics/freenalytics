import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, SchemaValidationError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/users/:username',
  method: 'patch',
  summary: 'Update the current user.',
  description: 'Update the user information for the requesting user.',
  throws: [
    new UnauthorizedRequestError(),
    new SchemaValidationError('')
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'UserResponseSchema'
  },
  pathParams: [
    {
      name: 'username',
      description: 'The username of the user to get.',
      type: 'string'
    }
  ],
  bodySchema: 'UserUpdateRequestSchema',
  tokenRequired: true
};

export default data;
