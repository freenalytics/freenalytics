import HttpStatus from 'http-status-codes';
import { RouteData } from '../../types';
import { UnauthorizedRequestError, BadRequestError, ResourceNotFoundError } from '../../../src/errors/http';

const data: RouteData = {
  path: '/applications/:domain/data',
  method: 'get',
  summary: 'Get data entries for an application for the requesting user.',
  description: 'Get paginated data entries for an application for the requesting user in descending order by creation date.',
  throws: [
    new UnauthorizedRequestError(),
    new BadRequestError(''),
    new ResourceNotFoundError('')
  ],
  success: {
    code: HttpStatus.OK,
    schema: 'ApplicationDataPaginatedResponseSchema'
  },
  pathParams: [
    {
      name: 'domain',
      description: 'The domain of the application to upload the data to.',
      type: 'string'
    }
  ],
  queryParams: [
    {
      name: 'start',
      description: 'The index cursor where to start the list of data entries. Defaults to `0`.',
      required: false,
      type: 'number',
      isArray: false
    },
    {
      name: 'limit',
      description: 'The number of data entries to return. Defaults to `50`.',
      required: false,
      type: 'number',
      isArray: false
    }
  ],
  tokenRequired: true
};

export default data;
