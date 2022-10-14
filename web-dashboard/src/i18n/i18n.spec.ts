import { isLocaleSupported, translate, ValidLocale, MessageKey } from './';

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
        translate('fr' as ValidLocale, 'one' as MessageKey);
      }).toThrow();
    });

    it('should throw if key does not exist.', () => {
      expect(() => {
        translate('en', 'nope' as MessageKey);
      }).toThrow();
    });

    it('should return the translated text.', () => {
      expect(translate('en', 'one' as MessageKey)).toBe(mockedStrings.en.one);
      expect(translate('es' as ValidLocale, 'one' as MessageKey)).toBe(mockedStrings.es.one);
    });

    it('should return text in default language if key does not exist on requested language.', () => {
      expect(translate('es' as ValidLocale, 'three' as MessageKey)).toBe(mockedStrings.en.three);
    });

    it('should return the translated text with values inserted.', () => {
      expect(translate('en', 'four' as MessageKey, { value: 'hi' }))
        .toBe(mockedStrings.en.four.replace('{value}', 'hi'));
    });
  });
});
