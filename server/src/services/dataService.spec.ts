import { createDataForApplication, getApplicationSchema } from './dataService';
import { promisify } from 'util';
const mockingoose = require('mockingoose');
import Data from '../models/data';
import Application from '../models/application';
import redisClient from '../redis/client';

jest.mock('redis', () => jest.requireActual('redis-mock'));
Object.defineProperty(redisClient, 'exists', {
  value: promisify(redisClient.exists.bind(redisClient))
});
Object.defineProperty(redisClient, 'set', {
  value: promisify(redisClient.set.bind(redisClient))
});
Object.defineProperty(redisClient, 'get', {
  value: promisify(redisClient.get.bind(redisClient))
});
Object.defineProperty(redisClient, 'del', {
  value: promisify(redisClient.del.bind(redisClient))
});
Object.defineProperty(redisClient, 'keys', {
  value: promisify(redisClient.keys.bind(redisClient))
});

const schema = {
  type: 'object',
  properties: {
    key: {
      type: 'value'
    }
  }
};
const app = {
  name: 'app',
  owner: 'moon',
  domain: 'FD-123',
  type: 'web',
  template: {
    raw_schema: '',
    schema
  },
  connectors: []
};
const data = {
  domain: 'FD-123',
  payload: {
    key: 'value'
  }
};

describe('Services: DataService', () => {
  describe('getApplicationSchema()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return query.getQuery().domain === app.domain ? app : null;
      }, 'findOne');
    });

    beforeEach(async () => {
      const keys = await redisClient.keys('*');
      await redisClient.del(keys);
    });

    afterAll(() => {
      mockingoose(Application).reset('findOne');
    });

    it('should resolve the schema cached in redis.', async () => {
      const cachedSchema = { key: 'value' };
      await redisClient.set('FD-123:schema', JSON.stringify(cachedSchema));

      const result = await getApplicationSchema('FD-123');
      expect(result).toMatchObject(cachedSchema);
    });

    it('should reject if the domain does not resolve to an application.', async () => {
      await expect(getApplicationSchema('not_found')).rejects.toThrow();
    });

    it('should update the cache with the schema when retrieved from the database.', async () => {
      await getApplicationSchema('FD-123');
      const cachedSchema = await redisClient.get('FD-123:schema') as string;

      expect(JSON.parse(cachedSchema)).toMatchObject(schema);
    });

    it('should resolve the schema stored in the database.', async () => {
      const result = await getApplicationSchema('FD-123');
      expect(result).toMatchObject(schema);
    });
  });

  describe('createDataForApplication()', () => {
    beforeAll(() => {
      mockingoose(Data).toReturn(data, 'save');
    });

    afterAll(() => {
      mockingoose(Data).reset('save');
    });

    it('should resolve with the created data.', async () => {
      const created = await createDataForApplication('FD-123', { key: 'value' });

      expect(created).toHaveProperty('domain', 'FD-123');
      expect(created).toHaveProperty('payload');
    });
  });
});
