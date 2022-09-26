import { getUsers } from './userController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as userService from '../services/userService';
import { InternalServerError } from '../errors/http';

const mockedUsers = [
  { username: 'moon' },
  { username: 'star' }
];

describe('Controllers: UserController', () => {
  const nextMock = jest.fn();

  beforeEach(() => {
    nextMock.mockClear();
  });

  describe('getUsers()', () => {
    const req = {} as Request;
    const res = new ResponseMock() as unknown as Response;

    const getAllUsersSpy = jest.spyOn(userService as any, 'getAllUsers')
      .mockResolvedValue(mockedUsers);

    beforeEach(() => {
      (res.send as jest.Mock).mockClear();
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
});
