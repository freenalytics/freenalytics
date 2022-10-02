import { jsonBodyRequired } from './controller';
import { Request, Response } from 'express';
import { BadRequestError } from '../errors/http';

describe('Middleware: Controller', () => {
  const nextMock = jest.fn();

  beforeEach(() => {
    nextMock.mockClear();
  });

  describe('jsonBodyRequired()', () => {
    const res = {} as Response;

    it('should call next with a BadRequestError if no body is inside the request.', () => {
      const req = {} as Request;
      jsonBodyRequired(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with a BadRequestError if the request body is empty.', () => {
      const req = {
        body: {}
      } as Request;
      jsonBodyRequired(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with nothing if the request body is valid.', () => {
      const req = {
        body: {
          something: 'is_here'
        }
      } as Request;
      jsonBodyRequired(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0]).toHaveLength(0);
    });
  });
});
