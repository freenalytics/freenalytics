import { DEFAULT_LOCALE, isLocaleSupported, translate, TranslateValuesForReact, LocalizedTranslateFunction } from '../i18n';

const useLocale = () => {
  const t: LocalizedTranslateFunction = (key: string, values: TranslateValuesForReact = {}): string => {
    return translate(DEFAULT_LOCALE, key, values);
  };

  return {
    t,
    isLocaleSupported,
    currentLocale: DEFAULT_LOCALE
  };
};

export default useLocale;
