import { generateTagDescription, generateTags } from './tags';
import { DocumentationData } from '../../documentation';

describe('Documentation: Docgen: OpenAPI: Tags', () => {
  describe('generateTagDescription()', () => {
    it('should return a string with the tag name.', () => {
      const result = generateTagDescription('my_tag');

      expect(result).toContain('operations for my_tag');
    });
  });

  describe('generateTags()', () => {
    it('should return an array of tags.', () => {
      const docsData = { paths: { tag1: null, tag2: null } } as unknown as DocumentationData;
      const result = generateTags(docsData);

      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('name', 'tag1');
      expect(result[0]).toHaveProperty('description');
      expect(result[1]).toHaveProperty('name', 'tag2');
      expect(result[1]).toHaveProperty('description');
    });
  });
});
