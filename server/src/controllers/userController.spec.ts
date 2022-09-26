import { getUsers, getByUsername } from './userController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as userService from '../services/userService';
import { InternalServerError } from '../errors/http';

const mockedUsers = [
  { username: 'moon' },
  { username: 'star' }
];

describe('Controllers: UserController', () => {
  const res = new ResponseMock() as unknown as Response;
  const nextMock = jest.fn();

  beforeEach(() => {
    (res.send as jest.Mock).mockClear();
    nextMock.mockClear();
  });

  describe('getUsers()', () => {
    const req = {} as Request;

    const getAllUsersSpy = jest.spyOn(userService as any, 'getAllUsers')
      .mockResolvedValue(mockedUsers);

    beforeEach(() => {
      getAllUsersSpy.mockClear();
    });

    it('should respond with a list of the users.', async () => {
      await getUsers(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedUsers);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getAllUsersSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getUsers(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });

  describe('getByUsername()', () => {
    const req = {
      params: {
        username: 'moon'
      }
    } as unknown as Request;

    const getUserByUsernameSpy = jest.spyOn(userService as any, 'getUserByUsername')
      .mockResolvedValue([mockedUsers]);

    beforeEach(() => {
      getUserByUsernameSpy.mockClear();
    });

    it('should respond with the fetched user.', async () => {
      await getByUsername(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject([mockedUsers]);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getUserByUsernameSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getByUsername(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });
});
