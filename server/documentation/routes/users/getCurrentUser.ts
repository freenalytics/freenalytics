import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/users/me',
  method: 'get',
  summary: 'Get the current user.',
  description: 'Get the user information for the requesting user.',
  throws: [
    new UnauthorizedRequestError()
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'UserResponseSchema'
  },
  tokenRequired: true
};

export default data;
