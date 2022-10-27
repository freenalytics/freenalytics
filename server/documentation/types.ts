import { HttpError } from '../src/errors/http';
import * as Schemas from './schemas';

export type SchemaName = keyof typeof Schemas;

export interface DocumentationMetadata {
  openapi: string,
  servers: {
    url: string
  }[]
}

export interface DocumentationInfo {
  title: string,
  description: string,
  version: string
}

export interface PathParam {
  name: string,
  description: string,
  type: 'string' | 'number'
}

export interface QueryParam {
  name: string,
  description: string,
  required: boolean,
  type: 'string' | 'boolean' | 'number'
  isArray: boolean
}

export interface RouteData {
  path: string,
  method: 'get' | 'put' | 'post' | 'delete' | 'patch',
  summary: string,
  description: string
  throws?: HttpError[],
  success: {
    code: number,
    schema: SchemaName,
    isArray?: boolean
  },
  pathParams?: PathParam[],
  queryParams?: QueryParam[],
  bodySchema?: SchemaName,
  tokenRequired: boolean
}
