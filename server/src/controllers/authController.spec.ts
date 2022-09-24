import { register, login } from './authController';
import { Request, Response } from 'express';
import User from '../models/user';
import {
  AccountLockedError,
  BadRequestError,
  InternalServerError,
  SchemaValidationError,
  WrongCredentialsError
} from '../errors/http';
import { ResponseMock } from '../../__mocks__/http_mocks';

describe('Controllers: AuthController', () => {
  const req = {
    body: {
      username: 'moonstar',
      password: 'Abc12345!',
      locale: 'en'
    }
  } as Request;
  const res = new ResponseMock() as unknown as Response;
  const nextMock = jest.fn();

  beforeEach(() => {
    (res.send as jest.Mock).mockClear();
    nextMock.mockClear();
  });

  describe('register()', () => {
    const registerSpy = jest.spyOn(User, 'register');

    beforeAll(() => {
      registerSpy.mockResolvedValue(null as never);
    });

    it('should respond with success if user body is correct.', async () => {
      await register(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data.message).toContain('creation successful');
    });

    it('should call next with a SchemaValidationError if the register body is invalid.', async () => {
      const req = {
        body: {
          username: 'user',
          password: 'invalidPass',
          locale: 'en'
        }
      } as Request;

      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should call next with a BadRequestError if no credentials are given.', async () => {
      const noPasswordError = { name: 'MissingPasswordError' };
      registerSpy.mockRejectedValueOnce(noPasswordError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);

      const noUsernameError = { name: 'MissingUsernameError' };
      registerSpy.mockRejectedValueOnce(noUsernameError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(2);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with a BadRequestError if user already exists.', async () => {
      const userExistsError = { name: 'UserExistsError' };
      registerSpy.mockRejectedValueOnce(userExistsError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(BadRequestError);
    });

    it('should call next with an AccountLockedError if there is rate limiting errors.', async () => {
      const attemptTooSoonError = { name: 'AttemptTooSoonError' };
      registerSpy.mockRejectedValueOnce(attemptTooSoonError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(AccountLockedError);

      const tooManyAttemptsError = { name: 'TooManyAttemptsError' };
      registerSpy.mockRejectedValueOnce(tooManyAttemptsError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(2);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(AccountLockedError);
    });

    it('should call next with a WrongCredentialsError if the credentials provided are wrong.', async () => {
      const incorrectPasswordError = { name: 'IncorrectPasswordError' };
      registerSpy.mockRejectedValueOnce(incorrectPasswordError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(WrongCredentialsError);

      const incorrectUsernameError = { name: 'IncorrectUsernameError' };
      registerSpy.mockRejectedValueOnce(incorrectUsernameError as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(2);
      expect(nextMock.mock.calls[1][0]).toBeInstanceOf(WrongCredentialsError);
    });

    it('should call next with an InternalServerError if any other error occurs.', async () => {
      const error = { name: 'SomeError' };
      registerSpy.mockRejectedValueOnce(error as never);
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });
  });

  describe('login()', () => {
    const req = {
      user: {
        _id: '123',
        username: 'moon',
        locale: 'en',
        createdAt: 'date'
      }
    } as unknown as Request;

    it('should respond with the token in the body.', () => {
      login(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toHaveProperty('token');
    });
  });
});
