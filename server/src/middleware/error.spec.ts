import { handleError } from './error';
import { Request, Response } from 'express';
import * as logger from '@greencoast/logger';
import { InternalServerError, ResourceNotFoundError } from '../errors/http';
import { ResponseMock } from '../../__mocks__/http_mocks';

jest.mock('@greencoast/logger');

describe('Middleware: Error', () => {
  const res = new ResponseMock() as unknown as Response;
  const req = {} as Request;
  const nextMock = jest.fn();

  beforeEach(() => {
    (logger.error as jest.Mock).mockClear();
    (res.send as jest.Mock).mockClear();
    nextMock.mockClear();
  });

  describe('handleError()', () => {
    it('should log the error if the status code is INTERNAL_SERVER_ERROR.', () => {
      const error = new InternalServerError('');
      handleError(error, req, res, nextMock);

      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(error);
    });

    it('should log the error if the error is not instance of HttpError.', () => {
      const error = new TypeError('Oops');
      handleError(error, req, res, nextMock);

      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(error);
    });

    it('should not log the error if the status code is anything else.', () => {
      const error = new ResourceNotFoundError('');
      handleError(error, req, res, nextMock);

      expect(logger.error).not.toHaveBeenCalled();
    });

    it('should respond with the error in the body.', () => {
      const error = new ResourceNotFoundError('');
      handleError(error, req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0]).toHaveProperty('error');
    });
  });
});
