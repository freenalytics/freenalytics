import { createDataForApplication, getApplicationSchema, getDataForApplication } from './dataService';
import { promisify } from 'util';
const mockingoose = require('mockingoose');
import Data from '../models/data';
import Application from '../models/application';
import redisClient from '../redis/client';
import { BadRequestError } from '../errors/http';
import { PAGINATION_MAX_LIMIT } from '../constants/pagination';

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
const data1 = {
  domain: 'FD-123',
  payload: {
    key: 'value1'
  },
  createdAt: new Date('2022-10-14T04:24:22.951Z')
};
const data2 = {
  domain: 'FD-123',
  payload: {
    key: 'value2'
  },
  createdAt: new Date('2022-11-14T04:24:22.951Z')
};
const data3 = {
  domain: 'FD-123',
  payload: {
    key: 'value3'
  },
  createdAt: new Date('2022-12-14T04:24:22.951Z')
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
      mockingoose(Data).toReturn(data1, 'save');
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

  describe('getDataForApplication()', () => {
    beforeAll(() => {
      mockingoose(Data).toReturn([data1, data2, data3], 'find');
      mockingoose(Data).toReturn(3, 'countDocuments');
    });

    afterAll(() => {
      mockingoose(Data).reset('find');
      mockingoose(Data).reset('countDocuments');
    });

    it('should reject if the limit is over 50.', async () => {
      await expect(getDataForApplication('FD-123', { start: 0, limit: PAGINATION_MAX_LIMIT + 5 })).rejects.toThrow(BadRequestError);
    });

    it('should reject if the start pointer is out of bounds.', async () => {
      await expect(getDataForApplication('FD-123', { start: 5, limit: 5 })).rejects.toThrow(BadRequestError);
      await expect(getDataForApplication('FD-123', { start: -1, limit: 5 })).rejects.toThrow(BadRequestError);
    });

    it('should resolve the adequate data.', async () => {
      mockingoose(Data).toReturn([data1], 'find');
      const result = await getDataForApplication('FD-123', { start: 0, limit: 1 });
      const expected = {
        result: [data1],
        pagination: {
          limit: 1,
          current: 0,
          previous: 0,
          next: 1
        }
      };

      expect(result).toMatchObject(expected);
      mockingoose(Data).toReturn([data1, data2, data3], 'find');
    });
  });
});
