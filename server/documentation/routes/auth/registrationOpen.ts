import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';

const data: RouteData = {
  path: '/auth/registration-open',
  method: 'get',
  summary: 'Check if user registration is enabled.',
  description: 'Check if user registration is enabled on the server. If it is disabled, users will not be able to register new accounts.',
  success: {
    code: HttpStatus.OK,
    schema: 'RegistrationOpenResponseSchema'
  },
  tokenRequired: false
};

export default data;
