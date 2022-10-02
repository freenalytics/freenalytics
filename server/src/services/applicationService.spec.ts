import { getAllApplicationsForUser } from './applicationService';
const mockingoose = require('mockingoose');
import Application from '../models/application';

const app1 = {
  name: 'app1',
  owner: 'moonstar',
  domain: 'FD-123',
  template: {
    raw_schema: 'schema1',
    schema: {}
  },
  connectors: [{
    package_url: 'https://example.com',
    language: 'TypeScript'
  }]
};
const app2 = {
  name: 'app2',
  owner: 'moonstar',
  domain: 'FD-456',
  template: {
    raw_schema: 'schema2',
    schema: {}
  },
  connectors: [{
    package_url: 'https://example.com',
    language: 'JavaScript'
  }]
};
const app3 = {
  name: 'app3',
  owner: 'not_me',
  domain: 'FD-789',
  template: {
    raw_schema: 'schema3',
    schema: {}
  },
  connectors: []
};

describe('Services: ApplicationService', () => {
  describe('getAllApplicationsForUser()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return [app1, app2, app3].filter((a) => query.getQuery().owner === a.owner);
      }, 'find');
    });

    afterAll(() => {
      mockingoose(Application).reset('find');
    });

    it('should resolve all applications for the user.', async () => {
      const apps = await getAllApplicationsForUser('moonstar');
      const owners = apps.map((a) => a.owner);

      expect(owners).toContain('moonstar');
      expect(owners).not.toContain(app3.owner);
    });
  });
});
