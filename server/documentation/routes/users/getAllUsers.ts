import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/users',
  method: 'get',
  summary: 'Get all users.',
  description: 'Get all registered users in the platform.',
  throws: [
    new UnauthorizedRequestError()
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'UserResponseSchema',
    isArray: true
  },
  tokenRequired: true
};

export default data;
