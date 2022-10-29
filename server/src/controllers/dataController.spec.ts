import { create, get, exportAsCsv } from './dataController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as dataService from '../services/dataService';
import { BadRequestError, SchemaValidationError } from '../errors/http';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_START } from '../constants/pagination';

const mockedData = {
  domain: 'FD-123',
  payload: {
    key: 'value'
  },
  createdAt: 'now'
};

const mockedSchema = {
  type: 'object',
  properties: {
    key: {
      type: 'string'
    }
  }
};

describe('Controllers: DataController', () => {
  const res = new ResponseMock() as unknown as Response;
  const nextMock = jest.fn();
  const getApplicationSchemaSpy = jest.spyOn(dataService, 'getApplicationSchema')
    .mockResolvedValue(mockedSchema);

  beforeEach(() => {
    (res.send as jest.Mock).mockClear();
    nextMock.mockClear();
    getApplicationSchemaSpy.mockClear();
  });

  describe('create()', () => {
    const createDataForApplicationSpy = jest.spyOn(dataService as any, 'createDataForApplication')
      .mockResolvedValue(mockedData);

    beforeEach(() => {
      createDataForApplicationSpy.mockClear();
    });

    it('should call next with a SchemaValidationError if the data payload is invalid.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        body: { key: 123 }
      } as unknown as Request;
      await create(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should save the data payload.', async () => {
      const payload = { key: 'value' };
      const req = {
        params: { domain: 'FD-123' },
        body: payload
      } as unknown as Request;
      await create(req, res, nextMock);

      expect(createDataForApplicationSpy).toHaveBeenCalledWith('FD-123', payload);
    });

    it('should respond with the data saved.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        body: { key: 'value' }
      } as unknown as Request;
      await create(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedData);
    });
  });

  describe('get()', () => {
    const getDataForApplicationForUserSpy = jest.spyOn(dataService as any, 'getDataForApplicationForUser')
      .mockResolvedValue([mockedData]);

    beforeEach(() => {
      getDataForApplicationForUserSpy.mockClear();
    });

    it('should call next with a BadRequestError if the start query parameter is invalid.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { start: 'what' },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with a BadRequestError if the start query parameter is a negative number.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { start: '-1' },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with a BadRequestError if the limit query parameter is invalid.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { limit: 'what' },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with a BadRequestError if the limit parameter is lesser than 0.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { limit: '0' },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should get the data with the default start and limit if not specified.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: {},
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(getDataForApplicationForUserSpy).toHaveBeenCalledWith('FD-123', 'moon', {
        start: PAGINATION_DEFAULT_START,
        limit: PAGINATION_DEFAULT_LIMIT
      });
    });

    it('should get the data with the provided start and limit values.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { start: 1, limit: 3 },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(getDataForApplicationForUserSpy).toHaveBeenCalledWith('FD-123', 'moon', {
        start: 1,
        limit: 3
      });
    });

    it('should respond with the data.', async () => {
      const req = {
        params: { domain: 'FD-123' },
        query: { start: 1, limit: 3 },
        user: { username: 'moon' }
      } as unknown as Request;
      await get(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject([mockedData]);
    });
  });

  describe('exportAsCsv()', () => {
    const req = {
      params: { domain: 'FD-123' },
      user: { username: 'moon' }
    } as unknown as Request;
    const res = new ResponseMock() as unknown as Response;

    const getDataForApplicationForUserAsCsvSpy = jest.spyOn(dataService, 'getDataForApplicationForUserAsCsv')
      .mockResolvedValue('');

    beforeEach(() => {
      getDataForApplicationForUserAsCsvSpy.mockClear();
      (res.attachment as jest.Mock).mockClear();
    });

    it('should set the attachment name in the response object.', async () => {
      await exportAsCsv(req, res, nextMock);

      expect(res.attachment).toHaveBeenCalledWith('FD-123-data.csv');
    });

    it('should send the data.', async () => {
      getDataForApplicationForUserAsCsvSpy.mockResolvedValueOnce('csv data');
      await exportAsCsv(req, res, nextMock);

      expect(res.send).toHaveBeenCalledWith('csv data');
    });
  });
});
