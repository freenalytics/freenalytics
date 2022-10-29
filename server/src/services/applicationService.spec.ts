import {
  getAllApplicationsForUser,
  createApplicationForUser,
  getApplicationForUserByDomain,
  deleteApplicationForUserByDomain,
  updateApplicationForUserByDomain
} from './applicationService';
const mockingoose = require('mockingoose');
import Application from '../models/application';
import Data from '../models/data';

const app1 = {
  name: 'app1',
  owner: 'moonstar',
  domain: 'FD-123',
  type: 'mobile',
  template: {
    raw_schema: 'schema1: hello',
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
  type: 'desktop',
  template: {
    raw_schema: 'schema2: hello',
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
  type: 'web',
  template: {
    raw_schema: 'schema3: hello',
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
        schema: 'type: object',
        type: 'web'
      });

      expect(created).toHaveProperty('name', 'app');
      expect(created).toHaveProperty('template.raw_schema', 'type: object');
      expect(created).toHaveProperty('type', 'web');
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
      await expect(getApplicationForUserByDomain('no_owner', 'no_domain')).rejects.toThrow(Error);
    });

    it('should reject if the domain exists but owner does not.', async () => {
      await expect(getApplicationForUserByDomain('no_owner', 'FD-123')).rejects.toThrow(Error);
    });

    it('should reject if the owner exists but the domain does not.', async () => {
      await expect(getApplicationForUserByDomain('moonstar', 'no_domain')).rejects.toThrow(Error);
    });

    it('should reject if the application with a domain is not owned by the requested user.', async () => {
      await expect(getApplicationForUserByDomain('moonstar', 'FD-789')).rejects.toThrow(Error);
    });

    it('should resolve the application.', async () => {
      const application = await getApplicationForUserByDomain('moonstar', 'FD-123');
      expect(application).toHaveProperty('name', app1.name);
      expect(application).toHaveProperty('owner', app1.owner);
      expect(application).toHaveProperty('domain', app1.domain);
    });
  });

  describe('deleteApplicationForUserByDomain()', () => {
    const dataDeleteSpy = jest.spyOn(Data as any, 'deleteMany')
      .mockResolvedValue(null);

    beforeEach(() => {
      dataDeleteSpy.mockClear();
    });

    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return {
          deletedCount: [app1, app2, app3].filter((a) => {
            return query.getQuery().owner === a.owner && query.getQuery().domain === a.domain;
          }).length
        };
      }, 'deleteOne');
      mockingoose(Data).toReturn(null, 'deleteMany');
    });

    afterAll(() => {
      mockingoose(Application).reset('deleteOne');
      mockingoose(Data).reset('deleteMany');
    });

    it('should reject if nothing was deleted.', async () => {
      await expect(deleteApplicationForUserByDomain('moonstar', 'FD-789')).rejects.toThrow(Error);
    });

    it('should delete all data.', async () => {
      await deleteApplicationForUserByDomain('moonstar', 'FD-123');
      expect(dataDeleteSpy).toHaveBeenCalledWith({ domain: 'FD-123' });
    });

    it('should resolve if an application was deleted.', async () => {
      expect(async () => {
        await deleteApplicationForUserByDomain('moonstar', 'FD-123');
      }).not.toThrow();
    });
  });

  describe('updateApplicationForUserByDomain()', () => {
    beforeAll(() => {
      mockingoose(Application).toReturn((query: any) => {
        return [app1, app2, app3].find((a) => {
          return query.getQuery().owner === a.owner && query.getQuery().domain === a.domain;
        });
      }, 'findOneAndUpdate');
    });

    afterAll(() => {
      mockingoose(Application).reset('findOneAndUpdate');
    });

    it('should resolve the correct application.', async () => {
      const application = await updateApplicationForUserByDomain('moonstar', 'FD-123', { name: 'new' });
      expect(application).toHaveProperty('owner', 'moonstar');
      expect(application).toHaveProperty('domain', 'FD-123');
    });

    it('should reject if the application was not found.', async () => {
      await expect(updateApplicationForUserByDomain('moonstar', 'FD-789', { name: 'new' })).rejects.toThrow(Error);
    });
  });
});
