import { createDataForApplication, getApplicationSchema, getDataForApplicationForUser, getDataForApplicationForUserAsCsv } from './dataService';
import { promisify } from 'util';
const mockingoose = require('mockingoose');
import Data from '../models/data';
import Application from '../models/application';
import redisClient from '../redis/client';
import { ResourceNotFoundError } from '../errors/http';

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
  beforeAll(() => {
    mockingoose(Application).toReturn((query: any) => {
      return query.getQuery().domain === app.domain && (query.getQuery().owner ?? app.owner) === app.owner ? app : null;
    }, 'findOne');
  });

  afterAll(() => {
    mockingoose(Application).reset('findOne');
  });

  describe('getApplicationSchema()', () => {
    beforeEach(async () => {
      const keys = await redisClient.keys('*');
      await redisClient.del(keys);
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

  describe('getDataForApplicationForUser()', () => {
    beforeEach(() => {
      mockingoose(Data).toReturn([data1, data2, data3], 'find');
      mockingoose(Data).toReturn(3, 'countDocuments');
    });

    afterAll(() => {
      mockingoose(Data).reset('find');
      mockingoose(Data).reset('countDocuments');
    });

    it('should reject ResourceNotFoundError if application is not found.', async () => {
      await expect(getDataForApplicationForUser('FD-12333', 'moon', { start: 5, limit: 1 })).rejects.toThrow(ResourceNotFoundError);
    });

    it('should reject ResourceNotFoundError if owner is not application owner is not found.', async () => {
      await expect(getDataForApplicationForUser('FD-123', 'moonstar', { start: 5, limit: 1 })).rejects.toThrow(ResourceNotFoundError);
    });

    it('should reject ResourceNotFoundError if the start index is out of bounds.', async () => {
      await expect(getDataForApplicationForUser('FD-123', 'moon', { start: 5, limit: 1 })).rejects.toThrow(ResourceNotFoundError);
    });

    it('should resolve an empty array if the no data entries exist for the given application.', async () => {
      mockingoose(Data).toReturn([], 'find');

      const result = await getDataForApplicationForUser('FD-123', 'moon', { start: 0, limit: 1 });
      expect(result.result).toHaveLength(0);
    });

    it('should resolve the adequate data.', async () => {
      mockingoose(Data).toReturn([data1], 'find');

      const result = await getDataForApplicationForUser('FD-123', 'moon', { start: 0, limit: 1 });
      const expected = {
        result: [data1],
        pagination: {
          limit: 1,
          current: 0,
          previous: 0,
          next: 1,
          total: 3,
          isLast: false
        }
      };

      expect(result).toMatchObject(expected);
    });
  });

  describe('getDataForApplicationForUserAsCsv()', () => {
    beforeEach(() => {
      mockingoose(Data).toReturn([data1], 'find');
    });

    afterAll(() => {
      mockingoose(Data).reset('find');
    });

    it('should reject ResourceNotFoundError if application is not found.', async () => {
      await expect(getDataForApplicationForUserAsCsv('FD-12333', 'moon')).rejects.toThrow(ResourceNotFoundError);
    });

    it('should reject ResourceNotFoundError if owner is not application owner is not found.', async () => {
      await expect(getDataForApplicationForUserAsCsv('FD-123', 'moonstar')).rejects.toThrow(ResourceNotFoundError);
    });

    it('should resolve the csv data.', async () => {
      const data = await getDataForApplicationForUserAsCsv('FD-123', 'moon');
      const expected = '"createdAt","key"\n"2022-10-14T04:24:22.951Z","value1"';

      expect(data).toBe(expected);
    });
  });
});
