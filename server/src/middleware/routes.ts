import { Request, Response, NextFunction } from 'express';
import { MethodNotAllowedError, ResourceNotFoundError } from '../errors/http';

type HTTP_METHODS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export const onlySupportedMethods = (...methods: HTTP_METHODS[]) => {
  return (_: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', `${methods.join(' ')} OPTIONS`);
    next(new MethodNotAllowedError());
  };
};

export const routeNotFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ResourceNotFoundError('This route is not handled by the server.'));
};
