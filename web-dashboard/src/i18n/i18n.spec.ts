import { isLocaleSupported, translate } from './';

const mockedStrings = {
  en: {
    one: 'Hello',
    two: 'Bye',
    three: 'Only in english.',
    four: 'With inserted {value}'
  },
  es: {
    one: 'Hola',
    two: 'Adios'
  }
};

jest.mock('./strings', () => ({
  get en() {
    return mockedStrings.en;
  },
  get es() {
    return mockedStrings.es;
  }
}));

describe('i18n', () => {
  describe('isLocaleSupported()', () => {
    it('should return true if locale is supported.', () => {
      expect(isLocaleSupported('en')).toBe(true);
    });

    it('should return false if locale is not supported.', () => {
      expect(isLocaleSupported('nope')).toBe(false);
    });
  });

  describe('translate()', () => {
    it('should throw if locale does not exist.', () => {
      expect(() => {
        translate('fr', 'one');
      }).toThrow();
    });

    it('should throw if key does not exist.', () => {
      expect(() => {
        translate('en', 'nope');
      }).toThrow();
    });

    it('should return the translated text.', () => {
      expect(translate('en', 'one')).toBe(mockedStrings.en.one);
      expect(translate('es', 'one')).toBe(mockedStrings.es.one);
    });

    it('should return text in default language if key does not exist on requested language.', () => {
      expect(translate('es', 'three')).toBe(mockedStrings.en.three);
    });

    it('should return the translated text with values inserted.', () => {
      expect(translate('en', 'four', { value: 'hi' }))
        .toBe(mockedStrings.en.four.replace('{value}', 'hi'));
    });
  });
});
