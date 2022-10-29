import toJsonSchema from 'to-json-schema';
import { requestBodyRef, schemaRef, exampleRef } from './refs';
import { SECURITY_JWT_NAME, APPLICATION_JSON } from './components';
import { ResponseBuilder } from '../../../src/utils/http';
import { HttpError, UnauthorizedRequestError } from '../../../src/errors/http';
import { DocumentationData } from '../../documentation';
import { RouteData, PathParam, QueryParam } from '../../types';

const KEY_SEPARATOR = '%%';
const DEFAULT_SUCCESS_DESCRIPTION = 'Successful response';
const DEFAULT_SUCCESS_BINARY_DESCRIPTION = 'Successful binary response';

export const generateErrorResponses = (data: RouteData) => {
  if (data.tokenRequired) {
    if (!data.throws?.some((e) => e instanceof UnauthorizedRequestError)) {
      throw new Error(`${data.method} ${data.path} requires a token but no UnauthorizedRequestError was added. Please add it to throws list.`);
    }
  }

  if (!data.throws) {
    return {};
  }

  return data.throws
    .sort((e1, e2) => e1.statusCode - e2.statusCode)
    .reduce((acc: object, error: HttpError) => {
      return {
        ...acc,
        [error.statusCode]: {
          description: error.description,
          content: {
            [APPLICATION_JSON]: {
              schema: toJsonSchema(new ResponseBuilder().withError(error).build()),
              example: new ResponseBuilder().withError(error).build()
            }
          }
        }
      };
    }, {});
};

export const generateSuccessfulResponseWithSchema = (data: RouteData) => {
  const successResponseBody = new ResponseBuilder().withStatusCode(data.success.code).build();
  const successResponse: Record<string, toJsonSchema.JSONSchema3or4> = {
    schema: toJsonSchema(successResponseBody)
  };

  successResponse.schema.properties!.data = {
    $ref: schemaRef(data.success.schema!)
  };
  successResponse.example = {
    $ref: exampleRef(data.success.isArray ? `${data.success.schema!}-arr` : data.success.schema!)
  };

  return {
    [data.success.code]: {
      content: {
        [APPLICATION_JSON]: successResponse
      },
      description: DEFAULT_SUCCESS_DESCRIPTION
    }
  };
};

export const generateSuccessfulResponseForBinary = (data: RouteData) => {
  const binaryType = data.success.binaryType!;

  return {
    [data.success.code]: {
      content: {
        [binaryType]: {
          schema: {
            type: 'string',
            format: 'binary'
          }
        }
      },
      description: DEFAULT_SUCCESS_BINARY_DESCRIPTION
    }
  };
};

export const generateResponses = (data: RouteData) => {
  const successfulResponse = data.success.schema ?
    generateSuccessfulResponseWithSchema(data) :
    generateSuccessfulResponseForBinary(data);

  return {
    ...successfulResponse,
    ...generateErrorResponses(data)
  };
};

export const generatePathParamsForRoute = (params: PathParam[]) => {
  return params.map((param) => {
    return {
      name: param.name,
      description: param.description,
      in: 'path',
      required: true,
      schema: {
        type: param.type
      }
    };
  });
};

export const generateQueryParamsForRoute = (params: QueryParam[]) => {
  return params.map((param) => {
    const schema = param.isArray ?
      {
        type: 'array',
        items: {
          type: param.type
        }
      } :
      {
        type: param.type
      };

    return {
      name: param.name,
      description: param.description,
      in: 'query',
      required: param.required,
      schema
    };
  });
};

export const generateParametersForRoute = (data: RouteData) => {
  const pathParams = data.pathParams ? generatePathParamsForRoute(data.pathParams) : [];
  const queryParams = data.queryParams ? generateQueryParamsForRoute(data.queryParams) : [];

  return [...pathParams, ...queryParams];
};

export const generatePathForOperation = (tag: string, operation: string, data: RouteData) => {
  const generatedPathData: Record<string, object | string> = {
    tags: [tag],
    summary: data.summary,
    description: data.description,
    operationId: operation,
    responses: generateResponses(data),
    parameters: generateParametersForRoute(data)
  };

  if (data.bodySchema) {
    generatedPathData.requestBody = {
      $ref: requestBodyRef(data.bodySchema)
    };
  }

  if (data.tokenRequired) {
    generatedPathData.security = [{
      [SECURITY_JWT_NAME]: []
    }];
  }

  return generatedPathData;
};

export const generatePathsForTag = (tag: string, operations: Record<string, RouteData>) => {
  const tagPaths: Record<string, object> = {};

  Object.entries(operations).forEach(([operation, data]) => {
    const { method, path } = data;
    const key = `${method}${KEY_SEPARATOR}${path}`;

    if (tagPaths[key]) {
      throw new Error(`Duplicate method ${method} for path ${path} found in documentation tree.`);
    }

    tagPaths[key] = generatePathForOperation(tag, operation, data);
  });

  return tagPaths;
};

export const generatePaths = (documentation: DocumentationData) => {
  const paths: Record<string, Record<string, object>> = {};

  Object.entries(documentation.paths).forEach(([tag, operations]) => {
    const pathsForTag = generatePathsForTag(tag, operations);

    Object.entries(pathsForTag).forEach(([key, data]) => {
      const [method, path] = key.split(KEY_SEPARATOR);
      const currentPathData = paths[path];

      if (!currentPathData) {
        paths[path] = {
          [method]: data
        };
        return;
      }

      paths[path] = {
        ...currentPathData,
        [method]: data
      };
    });
  });

  return paths;
};
