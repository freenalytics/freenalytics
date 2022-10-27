/* eslint-disable max-lines */
import {
  generateErrorResponses,
  generateSuccessfulResponse,
  generateResponses,
  generatePathParamsForRoute,
  generateQueryParamsForRoute,
  generateParametersForRoute,
  generatePathForOperation,
  generatePathsForTag,
  generatePaths
} from './paths';
import { RouteData, PathParam, QueryParam } from '../../types';
import { DocumentationData } from '../../documentation';
import {
  BadRequestError,
  ForbiddenRequestError,
  ResourceNotFoundError,
  UnauthorizedRequestError
} from '../../../src/errors/http';

describe('Documentation: Docgen: OpenAPI: Paths', () => {
  describe('generateErrorResponses()', () => {
    it('should throw if throws does not contain UnauthorizedRequestError if token is required.', () => {
      const data = {
        tokenRequired: true,
        throws: []
      } as unknown as RouteData;

      expect(() => {
        generateErrorResponses(data);
      }).toThrow();
    });

    it('should return an empty object if there is no throws.', () => {
      expect(generateErrorResponses({} as unknown as RouteData)).toMatchObject({});
    });

    it('should return an object with the error codes sorted.', () => {
      const data = {
        throws: [
          new ForbiddenRequestError(''),
          new ResourceNotFoundError(''),
          new BadRequestError('')
        ]
      } as unknown as RouteData;
      const result = generateErrorResponses(data);

      expect(Object.keys(result)).toEqual(['400', '403', '404']);
    });

    it('should return an object with the error responses.', () => {
      const data = {
        throws: [
          new ForbiddenRequestError('')
        ]
      } as unknown as RouteData;
      const result = generateErrorResponses(data);

      expect(result).toHaveProperty('403');
      expect(result).toHaveProperty('403.description');
      expect(result).toHaveProperty('403.content');
    });
  });

  describe('generateSuccessfulResponse()', () => {
    it('should return an object with the success response.', () => {
      const data = {
        success: {
          code: 200,
          schema: 'TestSchema'
        }
      } as unknown as RouteData;
      const result = generateSuccessfulResponse(data);

      expect(result).toHaveProperty('200');
      expect(result).toHaveProperty('200.description');
      expect(result).toHaveProperty('200.content');
    });
  });

  describe('generateResponses()', () => {
    it('should return an object with the responses.', () => {
      const data = {
        success: {
          code: 200,
          schema: 'TestSchema'
        },
        throws: [
          new ForbiddenRequestError('')
        ]
      } as unknown as RouteData;
      const result = generateResponses(data);

      expect(result).toHaveProperty('200');
      expect(result).toHaveProperty('200.description');
      expect(result).toHaveProperty('200.content');

      expect(result).toHaveProperty('403');
      expect(result).toHaveProperty('403.description');
      expect(result).toHaveProperty('403.content');
    });
  });

  describe('generatePathParamsForRoute()', () => {
    it('should return an array with the path params.', () => {
      const params: PathParam[] = [{
        name: 'p1',
        description: 'p1-desc',
        type: 'string'
      }];
      const expected = [{
        name: 'p1',
        description: 'p1-desc',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }];

      const result = generatePathParamsForRoute(params);
      expect(result).toMatchObject(expected);
    });
  });

  describe('generateQueryParamsForRoute()', () => {
    it('should return an array with the query params for a non array type.', () => {
      const params: QueryParam[] = [{
        name: 'q1',
        description: 'q1-desc',
        type: 'string',
        required: false,
        isArray: false
      }];
      const expected = [{
        name: 'q1',
        description: 'q1-desc',
        in: 'query',
        required: false,
        schema: {
          type: 'string'
        }
      }];

      const result = generateQueryParamsForRoute(params);
      expect(result).toMatchObject(expected);
    });

    it('should return an array with the query params for an array type.', () => {
      const params: QueryParam[] = [{
        name: 'q1',
        description: 'q1-desc',
        type: 'string',
        required: true,
        isArray: true
      }];
      const expected = [{
        name: 'q1',
        description: 'q1-desc',
        in: 'query',
        required: true,
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }];

      const result = generateQueryParamsForRoute(params);
      expect(result).toMatchObject(expected);
    });
  });

  describe('generateParametersForRoute()', () => {
    it('should return an array with the path params.', () => {
      const data = {
        pathParams: [{
          name: 'p1',
          description: 'p1-desc',
          type: 'string'
        }],
        queryParams: [{
          name: 'q1',
          description: 'q1-desc',
          type: 'string',
          required: true,
          isArray: true
        }]
      } as unknown as RouteData;
      const result = generateParametersForRoute(data);

      expect(result[0]).toHaveProperty('name', 'p1');
      expect(result[0]).toHaveProperty('in', 'path');
      expect(result[1]).toHaveProperty('name', 'q1');
      expect(result[1]).toHaveProperty('in', 'query');
    });
  });

  describe('generatePathForOperation()', () => {
    it('should return an object with the basic path data.', () => {
      const data = {
        success: {
          code: 200,
          schema: 'Response'
        },
        summary: 'sum',
        description: 'desc'
      } as unknown as RouteData;
      const result = generatePathForOperation('tag', 'operation', data);

      expect(result).toHaveProperty('tags');
      expect(result.tags).toMatchObject(['tag']);
      expect(result).toHaveProperty('summary', 'sum');
      expect(result).toHaveProperty('description', 'desc');
      expect(result).toHaveProperty('operationId', 'operation');
      expect(result).not.toHaveProperty('requestBody');
      expect(result).not.toHaveProperty('security');
    });

    it('should return an object with bodySchema in path data if bodySchema exists.', () => {
      const data = {
        success: {
          code: 200,
          schema: 'Response'
        },
        bodySchema: 'TestSchema'
      } as unknown as RouteData;
      const result = generatePathForOperation('tag', 'operation', data);

      expect(result).toHaveProperty('requestBody.$ref');
      expect((result.requestBody as any).$ref).toContain('TestSchema');
    });

    it('should return an object with bodySchema in path data if tokenRequired is true.', () => {
      const data = {
        success: {
          code: 200,
          schema: 'Response'
        },
        tokenRequired: true,
        throws: [new UnauthorizedRequestError()]
      } as unknown as RouteData;
      const result = generatePathForOperation('tag', 'operation', data);

      expect(result).toHaveProperty('security');
    });
  });

  describe('generatePathsForTag()', () => {
    it('should return an object with the paths for the tag.', () => {
      const data = {
        method: 'post',
        path: '/path',
        success: {
          code: 200,
          schema: 'Response'
        },
        summary: 'sum',
        description: 'desc'
      } as unknown as RouteData;
      const result = generatePathsForTag('tag', {
        operation: data
      });

      expect(result).toHaveProperty('post%%/path');
    });

    it('should throw if a method is repeated for the same path.', () => {
      const data = {
        method: 'post',
        path: '/path',
        success: {
          code: 200,
          schema: 'Response'
        },
        summary: 'sum',
        description: 'desc'
      } as unknown as RouteData;
      expect(() => {
        generatePathsForTag('tag', {
          op1: data,
          op2: data
        });
      }).toThrow();
    });
  });

  describe('generatePaths()', () => {
    it('should return an object with the paths.', () => {
      const data = {
        paths: {
          tag1: {
            op1: {
              method: 'post',
              path: '/path',
              success: {
                code: 200,
                schema: 'Response'
              },
              summary: 'sum',
              description: 'desc'
            },
            op2: {
              method: 'get',
              path: '/path',
              success: {
                code: 200,
                schema: 'Response'
              },
              summary: 'sum',
              description: 'desc'
            }
          }
        }
      } as unknown as DocumentationData;
      const result = generatePaths(data);

      expect(result).toHaveProperty('/path');
      expect(result).toHaveProperty('/path.get');
      expect(result).toHaveProperty('/path.post');
    });
  });
});
