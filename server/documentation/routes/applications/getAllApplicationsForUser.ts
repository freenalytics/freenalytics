import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications',
  method: 'get',
  summary: 'Get all applications for the requesting user.',
  description: 'Get all applications for the requesting user.',
  throws: [
    new UnauthorizedRequestError()
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'ApplicationResponseSchema',
    isArray: true
  },
  tokenRequired: true
};

export default data;
