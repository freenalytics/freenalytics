import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/auth/login',
  method: 'post',
  summary: 'Login with your user account.',
  description: 'Login with your user account. Responds with a bearer token to authenticate further requests.',
  throws: [
    new UnauthorizedRequestError()
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'LoginResponseSchema'
  },
  bodySchema: 'LoginRequestSchema',
  tokenRequired: false
};

export default data;
