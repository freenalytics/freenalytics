import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { ForbiddenRequestError, BadRequestError, AccountLockedError, WrongCredentialsError, SchemaValidationError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/auth/register',
  method: 'post',
  summary: 'Register a new user account.',
  description: 'Register a new user account. This route will only work if the server has enabled user registration.',
  throws: [
    new ForbiddenRequestError(''),
    new BadRequestError(''),
    new AccountLockedError(''),
    new WrongCredentialsError(''),
    new SchemaValidationError('')
  ],
  success: {
    code: HttpStatus.CREATED,
    schema: 'RegisterResponseSchema'
  },
  bodySchema: 'RegisterRequestSchema',
  tokenRequired: false
};

export default data;
