import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, ResourceNotFoundError, WrongCredentialsError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/auth/change-password',
  method: 'put',
  summary: 'Change your user account password.',
  description: 'Change your user account password.',
  throws: [
    new UnauthorizedRequestError(),
    new ResourceNotFoundError(''),
    new WrongCredentialsError('')
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'ChangePasswordResponseSchema'
  },
  bodySchema: 'ChangePasswordRequestSchema',
  tokenRequired: true
};

export default data;
