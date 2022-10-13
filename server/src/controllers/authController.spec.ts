import { register, login, registrationOpen, changePassword } from './authController';
import { Request, Response } from 'express';
import User, { UserModel } from '../models/user';
import {
  AccountLockedError,
  BadRequestError,
  ForbiddenRequestError,
  InternalServerError,
  SchemaValidationError,
  WrongCredentialsError
} from '../errors/http';
import { ResponseMock } from '../../__mocks__/http_mocks';
import * as config from '../config';
import * as userService from '../services/userService';

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
    Object.defineProperty(config, 'REGISTRATION_OPEN', { value: true });
  });

  describe('register()', () => {
    const registerSpy = jest.spyOn(User, 'register');

    beforeAll(() => {
      registerSpy.mockResolvedValue(null as never);
    });

    it('should call next with a ForbiddenRequestError if account registration is disabled.', async () => {
      Object.defineProperty(config, 'REGISTRATION_OPEN', { value: false });
      await register(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(ForbiddenRequestError);
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
        locale: 'en'
      }
    } as unknown as Request;

    it('should respond with the token in the body.', () => {
      login(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toHaveProperty('token');
    });
  });

  describe('registrationOpen()', () => {
    it('should return open true if registration is open.', () => {
      Object.defineProperty(config, 'REGISTRATION_OPEN', { value: true });
      registrationOpen(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject({ open: true });
    });

    it('should return open false if registration is closed.', () => {
      Object.defineProperty(config, 'REGISTRATION_OPEN', { value: false });
      registrationOpen(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect((res.send as jest.Mock).mock.calls[0][0].data).toMatchObject({ open: false });
    });
  });

  describe('changePassword()', () => {
    const req = {
      user: {
        username: 'moon'
      },
      body: {
        old_password: 'Abc12345!',
        new_password: 'Dfe67890!'
      }
    } as unknown as Request;

    const changePasswordMock = jest.fn();
    const getUserByUsernameSpy = jest.spyOn(userService as any, 'getUserByUsername')
      .mockResolvedValue({ changePassword: changePasswordMock } as unknown as UserModel);

    beforeEach(() => {
      getUserByUsernameSpy.mockClear();
      changePasswordMock.mockClear();
    });

    afterAll(() => {
      getUserByUsernameSpy.mockRestore();
    });

    it('should call next with a SchemaValidationError if the changePassword body is invalid.', async () => {
      const req = {
        user: {
          username: 'moon'
        },
        body: {
          old_password: 'Abc12345!',
          new_password: 'invalid'
        }
      } as unknown as Request;

      await changePassword(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(SchemaValidationError);
    });

    it('should call next with a WrongCredentialsError if password is incorrect.', async () => {
      changePasswordMock.mockRejectedValueOnce({ name: 'IncorrectPasswordError' });
      await changePassword(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(WrongCredentialsError);
    });

    it('should call next with a InternalServerError if some other error happens.', async () => {
      changePasswordMock.mockRejectedValueOnce({ name: 'UnknownError' });
      await changePassword(req, res, nextMock);

      expect(nextMock).toHaveBeenCalledTimes(1);
      expect(nextMock.mock.calls[0][0]).toBeInstanceOf(InternalServerError);
    });

    it('should respond with a success message if password is changed.', async () => {
      await changePassword(req, res, nextMock);

      expect(res.send).toHaveBeenCalledTimes(1);

      const firstArgument = (res.send as jest.Mock).mock.calls[0][0];
      expect(firstArgument.data).toHaveProperty('message');
      expect(firstArgument.data.message).toContain('successfully');
    });
  });
});
