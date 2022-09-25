import { DEFAULT_LOCALE, isLocaleSupported, translate, TranslateValues, LocalizedTranslateFunction } from '../i18n';

const useLocale = () => {
  const t: LocalizedTranslateFunction = (key: string, values: TranslateValues = {}): string => {
    return translate(DEFAULT_LOCALE, key, values);
  };

  return {
    t,
    isLocaleSupported,
    currentLocale: DEFAULT_LOCALE
  };
};

export default useLocale;
