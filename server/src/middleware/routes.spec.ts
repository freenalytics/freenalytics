import { onlySupportedMethods } from './routes';
import { Request, Response } from 'express';
import { MethodNotAllowedError } from '../errors/http';

describe('Middleware: Routes', () => {
  const nextMock = jest.fn();

  beforeEach(() => {
    nextMock.mockClear();
  });

  describe('onlySupportedMethods()', () => {
    let req = {} as Request;
    let res = {
      header: jest.fn()
    } as unknown as Response;

    beforeEach(() => {
      req = {} as Request;
      res = {
        header: jest.fn()
      } as unknown as Response;
    });

    it('should set the methods in the Access-Control header.', () => {
      onlySupportedMethods('GET', 'POST')(req, res, nextMock);
      expect(res.header).toHaveBeenCalledTimes(1);
      expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET POST OPTIONS');
    });

    it('should call next with a MethodNotAllowedError.', () => {
      onlySupportedMethods('GET', 'POST')(req, res, nextMock);
      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(MethodNotAllowedError);
    });
  });
});
