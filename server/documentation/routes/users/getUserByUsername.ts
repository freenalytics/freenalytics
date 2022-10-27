import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, ResourceNotFoundError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/users/:username',
  method: 'get',
  summary: 'Get a user by their username.',
  description: 'Get a user by their username.',
  throws: [
    new UnauthorizedRequestError(),
    new ResourceNotFoundError('')
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
  tokenRequired: true
};

export default data;
