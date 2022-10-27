import { generateSpec, generateSpecFile } from './data';
import * as fs from 'fs';

jest.mock('fs');

describe('Documentation: Docgen: Data', () => {
  describe('generateSpec()', () => {
    it('should return an object with the necessary properties.', () => {
      const spec = generateSpec();

      expect(spec).toHaveProperty('openapi');
      expect(spec).toHaveProperty('servers');
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('tags');
      expect(spec).toHaveProperty('paths');
      expect(spec).toHaveProperty('components');
    });
  });

  describe('generateSpecFile()', () => {
    it('should create the output folder.', () => {
      const path = '/opt/spec.yml';
      generateSpecFile({}, path);

      expect(fs.mkdirSync).toHaveBeenCalledWith('/opt', { recursive: true });
    });

    it('should write to the output file.', () => {
      const path = '/opt/spec.yml';
      generateSpecFile({}, path);

      expect(fs.writeFileSync).toHaveBeenCalledWith(path, '{}\n', { encoding: 'utf-8' });
    });
  });
});
