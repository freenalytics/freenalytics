import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, ResourceNotFoundError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications/:domain/data/csv',
  method: 'get',
  summary: 'Export all data entries for an application for the requesting user as CSV.',
  description: 'Export all data entries for an application for the requesting user as CSV.',
  throws: [
    new UnauthorizedRequestError(),
    new ResourceNotFoundError('')
  ],
  success: {
    code: HttpStatus.OK,
    binaryType: 'text/csv'
  },
  pathParams: [
    {
      name: 'domain',
      description: 'The domain of the application to upload the data to.',
      type: 'string'
    }
  ],
  tokenRequired: true
};

export default data;
