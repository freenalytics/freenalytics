import {
  getAllApplicationsForUser,
  createApplicationForUser,
  getApplicationForUserByDomain,
  deleteApplicationForUserByDomain
} from './applicationService';
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

  describe('createApplicationForUser()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn(app1, 'save');
    });

    afterAll(() => {
      mockingoose(Application).reset('save');
    });

    it('should resolve with the created application.', async () => {
      const created = await createApplicationForUser('moonstar', {
        name: 'app',
        schema: 'schema'
      });

      expect(created).toHaveProperty('name', 'app');
      expect(created).toHaveProperty('template.schema', 'schema');
    });
  });

  describe('getApplicationForUserByDomain()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return [app1, app2, app3].find((a) => {
          return query.getQuery().owner === a.owner && query.getQuery().domain === a.domain;
        });
      }, 'findOne');
    });

    afterAll(() => {
      mockingoose(Application).reset('findOne');
    });

    it('should reject if the owner and domain do not exist.', async () => {
      try {
        await getApplicationForUserByDomain('no_owner', 'no_domain');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should reject if the domain exists but owner does not.', async () => {
      try {
        await getApplicationForUserByDomain('no_owner', 'FD-123');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should reject if the owner exists but the domain does not.', async () => {
      try {
        await getApplicationForUserByDomain('moonstar', 'no_domain');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should reject if the application with a domain is not owned by the requested user.', async () => {
      try {
        await getApplicationForUserByDomain('moonstar', 'FD-789');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should resolve the application.', async () => {
      const application = await getApplicationForUserByDomain('moonstar', 'FD-123');
      expect(application).toHaveProperty('name', app1.name);
      expect(application).toHaveProperty('owner', app1.owner);
      expect(application).toHaveProperty('domain', app1.domain);
    });
  });

  describe('deleteApplicationForUserByDomain()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return {
          deletedCount: [app1, app2, app3].filter((a) => {
            return query.getQuery().owner === a.owner && query.getQuery().domain === a.domain;
          }).length
        };
      }, 'deleteOne');
    });

    afterAll(() => {
      mockingoose(Application).reset('deleteOne');
    });

    it('should reject if nothing was deleted.', async () => {
      try {
        await deleteApplicationForUserByDomain('moonstar', 'FD-789');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should resolve if an application was deleted.', async () => {
      expect(async () => {
        await deleteApplicationForUserByDomain('moonstar', 'FD-123');
      }).not.toThrow();
    });
  });
});
