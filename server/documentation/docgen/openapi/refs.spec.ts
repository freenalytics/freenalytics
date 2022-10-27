import { schemaRef, requestBodyRef, exampleRef } from './refs';

describe('Documentation: Docgen: OpenAPI: Refs', () => {
  describe('schemaRef()', () => {
    it('should return the correct schema ref string.', () => {
      expect(schemaRef('my_schema')).toBe('#/components/schemas/my_schema');
    });
  });

  describe('requestBodyRef()', () => {
    it('should return the correct request body ref string.', () => {
      expect(requestBodyRef('my_schema')).toBe('#/components/requestBodies/my_schema');
    });
  });

  describe('exampleRef()', () => {
    it('should return the correct example ref string.', () => {
      expect(exampleRef('my_schema')).toBe('#/components/examples/my_schema');
    });
  });
});
