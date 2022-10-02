import { getAll } from './applicationController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as applicationService from '../services/applicationService';

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
});
