import { getAll } from './applicationController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as applicationService from '../services/applicationService';
import { InternalServerError, ResourceNotFoundError } from '../errors/http';

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

    it('should call next with the error if an HttpError occurs.', async () => {
      getAllApplicationsForUserSpy.mockRejectedValueOnce(new ResourceNotFoundError(''));
      await getAll(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ResourceNotFoundError);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getAllApplicationsForUserSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getAll(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });
});
