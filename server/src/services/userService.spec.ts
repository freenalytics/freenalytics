/* eslint-disable no-underscore-dangle */
import { getAllUsers, getUserById, getUserByUsername, updateUserByUsername } from './userService';
const mockingoose = require('mockingoose');
import User from '../models/user';

const user1 = {
  username: 'moon',
  createdAt: '2022-09-22T19:25:37.751Z',
  locale: 'en',
  _id: '507f191e810c19729de860ea'
};
const user2 = {
  username: 'star',
  createdAt: '2022-09-22T19:25:37.751Z',
  locale: 'en'
};

describe('Services: UserService', () => {
  describe('getAllUsers()', () => {
    beforeAll(() => {
      mockingoose(User).toReturn([user1, user2], 'find');
    });

    afterAll(() => {
      mockingoose(User).reset('find');
    });

    it('should resolve all the users.', async () => {
      const users = await getAllUsers();
      const usernames = users.map((u) => u.username);

      expect(usernames).toContain('moon');
      expect(usernames).toContain('star');
    });
  });

  describe('getUserById()', () => {
    beforeAll(() => {
      mockingoose(User).toReturn((query: any) => {
        return query.getQuery()._id === user1._id ? user1 : null;
      }, 'findOne');
    });

    afterAll(() => {
      mockingoose(User).reset('findOne');
    });

    it('should resolve the correct user.', async () => {
      const user = await getUserById(user1._id);
      expect(user.username).toContain('moon');
    });

    it('should reject if the user was not found.', async () => {
      await expect(getUserById('not_found')).rejects.toThrow(Error);
    });
  });

  describe('getUserByUsername()', () => {
    beforeAll(() => {
      mockingoose(User).toReturn((query: any) => {
        return query.getQuery().username === user1.username ? user1 : null;
      }, 'findOne');
    });

    afterAll(() => {
      mockingoose(User).reset('findOne');
    });

    it('should resolve the correct user.', async () => {
      const user = await getUserByUsername(user1.username);
      expect(user.username).toContain('moon');
    });

    it('should reject if the user was not found.', async () => {
      await expect(getUserByUsername('not_found')).rejects.toThrow(Error);
    });
  });

  describe('updateUserByUsername()', () => {
    beforeAll(() => {
      mockingoose(User).toReturn((query: any) => {
        return query.getQuery().username === user1.username ? user1 : null;
      }, 'findOneAndUpdate');
    });

    afterAll(() => {
      mockingoose(User).reset('findOneAndUpdate');
    });

    it('should resolve the correct user.', async () => {
      const user = await updateUserByUsername(user1.username, { locale: 'fr' });
      expect(user.username).toContain('moon');
    });

    it('should reject if the user was not found.', async () => {
      await expect(updateUserByUsername('not_found', { locale: 'fr' })).rejects.toThrow(Error);
    });
  });
});
