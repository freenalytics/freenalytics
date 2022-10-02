import { getAll, create, getByDomain, deleteByDomain, updateByDomain } from './applicationController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as applicationService from '../services/applicationService';
import { SchemaValidationError } from '../errors/http';

const mockedApps = [
  { name: 'app1' },
  { name: 'app2' }
];

describe('Controllers: ApplicationController', () => {
  const res = new ResponseMock() as unknown as Response;
  const nextMock = jest.fn();

  beforeEach(() => {
    (res.send as jest.Mock).mockClear();
    nextMock.mockClear();
  });

  describe('getAll()', () => {
    const req = {
      user: {
        username: 'moon'
      }
    } as unknown as Request;

    const getAllApplicationsForUserSpy = jest.spyOn(applicationService as any, 'getAllApplicationsForUser')
      .mockResolvedValue(mockedApps);

    beforeEach(() => {
      getAllApplicationsForUserSpy.mockClear();
    });

    it('should respond with a list of applications.', async () => {
      await getAll(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedApps);
    });

    it('should call next with the error if it occurs.', async () => {
      const error = new Error('Oops');
      getAllApplicationsForUserSpy.mockRejectedValueOnce(error);
      await getAll(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('create()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      body: {
        name: 'app1',
        schema: 'schema'
      }
    } as unknown as Request;

    const createApplicationForUserSpy = jest.spyOn(applicationService as any, 'createApplicationForUser')
      .mockResolvedValue(mockedApps[0]);

    beforeEach(() => {
      createApplicationForUserSpy.mockClear();
    });

    it('should call next with a SchemaValidationError if the body provided is invalid.', async () => {
      const req = {
        user: {
          username: 'moon'
        },
        body: {
          illegal: 'yes'
        }
      } as unknown as Request;
      await create(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should respond with the created application.', async () => {
      await create(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedApps[0]);
    });

    it('should call next with the error if it occurs.', async () => {
      const error = new Error('Oops');
      createApplicationForUserSpy.mockRejectedValueOnce(error);
      await create(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('getByDomain()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      params: {
        domain: 'FD-123'
      }
    } as unknown as Request;

    const getApplicationForUserByDomainSpy = jest.spyOn(applicationService as any, 'getApplicationForUserByDomain')
      .mockResolvedValue(mockedApps[0]);

    beforeEach(() => {
      getApplicationForUserByDomainSpy.mockClear();
    });

    it('should respond with the application.', async () => {
      await getByDomain(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedApps[0]);
    });

    it('should call next with the error if it occurs.', async () => {
      const error = new Error('Oops');
      getApplicationForUserByDomainSpy.mockRejectedValueOnce(error);
      await getByDomain(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteByDomain()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      params: {
        domain: 'FD-123'
      }
    } as unknown as Request;

    const deleteApplicationForUserByDomainSpy = jest.spyOn(applicationService, 'deleteApplicationForUserByDomain')
      .mockResolvedValue();

    beforeEach(() => {
      deleteApplicationForUserByDomainSpy.mockClear();
    });

    it('should respond with a deleted message.', async () => {
      await deleteByDomain(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toHaveProperty('message');
      expect((res.send as jest.Mock).mock.calls[0][0].data.message).toContain('deleted');
    });

    it('should call next with the error if it occurs.', async () => {
      const error = new Error('Oops');
      deleteApplicationForUserByDomainSpy.mockRejectedValueOnce(error);
      await deleteByDomain(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });

  describe('updateByDomain()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      params: {
        domain: 'FD-123'
      },
      body: {
        name: 'new_name'
      }
    } as unknown as Request;

    const updateApplicationForUserByDomainSpy = jest.spyOn(applicationService as any, 'updateApplicationForUserByDomain')
      .mockResolvedValue(mockedApps[0]);

    beforeEach(() => {
      updateApplicationForUserByDomainSpy.mockClear();
    });

    it('should call next with a SchemaValidationError if the body provided is invalid.', async () => {
      const req = {
        user: {
          username: 'moon'
        },
        params: {
          domain: 'FD-123'
        },
        body: {
          illegal: 'yes'
        }
      } as unknown as Request;
      await updateByDomain(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should respond with the updated application.', async () => {
      await updateByDomain(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedApps[0]);
    });

    it('should call next with the error if it occurs.', async () => {
      const error = new Error('Oops');
      updateApplicationForUserByDomainSpy.mockRejectedValueOnce(error);
      await updateByDomain(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock).toHaveBeenCalledWith(error);
    });
  });
});
