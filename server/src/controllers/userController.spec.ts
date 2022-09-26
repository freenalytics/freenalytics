import { getAll, getByUsername, getCurrent, updateCurrent } from './userController';
import { Request, Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as userService from '../services/userService';
import { BadRequestError, InternalServerError, ResourceNotFoundError, SchemaValidationError } from '../errors/http';

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

  describe('getAll()', () => {
    const req = {} as Request;

    const getAllUsersSpy = jest.spyOn(userService as any, 'getAllUsers')
      .mockResolvedValue(mockedUsers);

    beforeEach(() => {
      getAllUsersSpy.mockClear();
    });

    it('should respond with a list of the users.', async () => {
      await getAll(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject(mockedUsers);
    });

    it('should call next with the error if an HttpError occurs.', async () => {
      getAllUsersSpy.mockRejectedValueOnce(new ResourceNotFoundError(''));
      await getAll(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ResourceNotFoundError);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getAllUsersSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getAll(req, res, nextMock);

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

    it('should call next with the error if an HttpError occurs.', async () => {
      getUserByUsernameSpy.mockRejectedValueOnce(new ResourceNotFoundError(''));
      await getByUsername(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ResourceNotFoundError);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getUserByUsernameSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getByUsername(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });

  describe('getCurrent()', () => {
    const req = {
      user: {
        username: 'moon'
      }
    } as unknown as Request;

    const getUserByUsernameSpy = jest.spyOn(userService as any, 'getUserByUsername')
      .mockResolvedValue([mockedUsers]);

    beforeEach(() => {
      getUserByUsernameSpy.mockClear();
    });

    it('should respond with the fetched user.', async () => {
      await getCurrent(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject([mockedUsers]);
    });

    it('should call next with the error if an HttpError occurs.', async () => {
      getUserByUsernameSpy.mockRejectedValueOnce(new ResourceNotFoundError(''));
      await getCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ResourceNotFoundError);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      getUserByUsernameSpy.mockRejectedValueOnce({ message: 'Oops' });
      await getCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });

  describe('updateCurrent()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      body: {
        locale: 'en'
      }
    } as unknown as Request;

    const updateUserByUsernameSpy = jest.spyOn(userService as any, 'updateUserByUsername')
      .mockResolvedValue([mockedUsers]);

    beforeEach(() => {
      updateUserByUsernameSpy.mockClear();
    });

    it('should call next with a BadRequestError if no body is provided.', async () => {
      const req = {
        user: {
          username: 'moon'
        }
      } as unknown as Request;
      await updateCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
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
      await updateCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should respond with the updated user.', async () => {
      await updateCurrent(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject([mockedUsers]);
    });

    it('should call next with the error if an HttpError occurs.', async () => {
      updateUserByUsernameSpy.mockRejectedValueOnce(new ResourceNotFoundError(''));
      await updateCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ResourceNotFoundError);
    });

    it('should call next with an InternalServerError if an error occurs.', async () => {
      updateUserByUsernameSpy.mockRejectedValueOnce({ message: 'Oops' });
      await updateCurrent(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });
});
