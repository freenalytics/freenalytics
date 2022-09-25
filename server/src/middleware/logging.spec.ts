import { logRequests } from './logging';
import { Request, Response } from 'express';
import * as logger from '@greencoast/logger';

const req = {
  method: 'GET',
  originalUrl: 'localhost',
  ip: '127.0.0.1'
} as Request;
const res = {
  statusCode: 200
} as Response;

jest.mock('@greencoast/logger');
jest.mock('on-finished', () => {
  return (_: Response, listener: Function) => {
    listener(null, res);
  };
});

describe('Middleware: Logging', () => {
  const nextMock = jest.fn();

  beforeEach(() => {
    (logger.info as jest.Mock).mockClear();
    (logger.warn as jest.Mock).mockClear();
    (logger.error as jest.Mock).mockClear();
    nextMock.mockClear();
  });

  describe('logRequests()', () => {
    it('should log.info the request for successful codes.', () => {
      res.statusCode = 200;
      logRequests(req, res, nextMock);
      expect(logger.info).toHaveBeenCalledTimes(1);

      const firstArgument = (logger.info as jest.Mock).mock.calls[0][0];
      expect(firstArgument).toContain(req.method);
      expect(firstArgument).toContain(req.originalUrl);
      expect(firstArgument).toContain(res.statusCode.toString());
      expect(firstArgument).toContain(req.ip);
    });

    it('should log.warn the request for client error codes.', () => {
      res.statusCode = 400;
      logRequests(req, res, nextMock);
      expect(logger.warn).toHaveBeenCalledTimes(1);

      const firstArgument = (logger.warn as jest.Mock).mock.calls[0][0];
      expect(firstArgument).toContain(req.method);
      expect(firstArgument).toContain(req.originalUrl);
      expect(firstArgument).toContain(res.statusCode.toString());
      expect(firstArgument).toContain(req.ip);
    });

    it('should log.error the request for server error codes.', () => {
      res.statusCode = 500;
      logRequests(req, res, nextMock);
      expect(logger.error).toHaveBeenCalledTimes(1);

      const firstArgument = (logger.error as jest.Mock).mock.calls[0][0];
      expect(firstArgument).toContain(req.method);
      expect(firstArgument).toContain(req.originalUrl);
      expect(firstArgument).toContain(res.statusCode.toString());
      expect(firstArgument).toContain(req.ip);
    });
  });
});
