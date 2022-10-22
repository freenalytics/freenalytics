import { createDataForApplication } from './dataService';
const mockingoose = require('mockingoose');
import Data from '../models/data';

const data1 = {
  domain: 'FD-123',
  payload: {
    key: 'value'
  }
};

describe('Services: DataService', () => {
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
});
