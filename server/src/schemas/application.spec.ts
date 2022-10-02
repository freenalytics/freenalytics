import {
  ApplicationCreateBody,
  ApplicationCreateSchema
} from './application';

describe('Schemas: Application', () => {
  describe('ApplicationCreateSchema', () => {
    const validApp: ApplicationCreateBody = {
      name: 'My app',
      schema: 'needs updating cause I need to implement the validator for this',
      connectors: [
        {
          package_url: 'https://example.com',
          language: 'JavaScript'
        },
        {
          package_url: 'https://example.com',
          language: 'TypeScript'
        }
      ]
    };

    describe('name', () => {
      it('should error if no name exists.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        delete appCopy.name;

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should error if name is empty.', () => {
        const validation = ApplicationCreateSchema.validate({ ...validApp, name: '' });
        expect(validation.error).toBeTruthy();
      });

      it('should not error if name is valid.', () => {
        const validation = ApplicationCreateSchema.validate(validApp);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('schema', () => {
      it('should error if no schema exists.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        delete appCopy.schema;

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should error if schema is empty.', () => {
        const validation = ApplicationCreateSchema.validate({ ...validApp, schema: '' });
        expect(validation.error).toBeTruthy();
      });

      it('should not error if schema is valid.', () => {
        const validation = ApplicationCreateSchema.validate(validApp);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('connectors.package_url', () => {
      it('should error if no connectors.package_url exists.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        appCopy.connectors = appCopy.connectors!.map((conn) => {
          const connCopy: any = { ...conn };
          delete connCopy.package_url;

          return connCopy;
        });

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should error if connectors.package_url is empty.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        appCopy.connectors = appCopy!.connectors!.map((conn) => {
          return {
            ...conn,
            package_url: ''
          };
        });

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should error if connectors.package_url is not a URI.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        appCopy.connectors = appCopy!.connectors!.map((conn) => {
          return {
            ...conn,
            package_url: 'not_a_uri'
          };
        });

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if connectors.package_url is valid.', () => {
        const validation = ApplicationCreateSchema.validate(validApp);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('connectors.language', () => {
      it('should error if no connectors.language exists.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        appCopy.connectors = appCopy.connectors!.map((conn) => {
          const connCopy: any = { ...conn };
          delete connCopy.language;

          return connCopy;
        });

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should error if connectors.language is empty.', () => {
        const appCopy: Partial<ApplicationCreateBody> = { ...validApp };
        appCopy.connectors = appCopy!.connectors!.map((conn) => {
          return {
            ...conn,
            language: ''
          };
        });

        const validation = ApplicationCreateSchema.validate(appCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if connectors.language is valid.', () => {
        const validation = ApplicationCreateSchema.validate(validApp);
        expect(validation.error).toBeFalsy();
      });
    });
  });
});
