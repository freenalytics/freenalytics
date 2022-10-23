import { create } from './dataController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as dataService from '../services/dataService';
import { SchemaValidationError } from '../errors/http';

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

    it('should call next if the data payload is invalid.', async () => {
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
});
