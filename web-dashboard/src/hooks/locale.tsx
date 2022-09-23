import { DEFAULT_LOCALE, isLocaleSupported, translate, TranslateValues } from '../i18n';

const useLocale = () => {
  const t = (key: string, values: TranslateValues = {}): string => {
    return translate(DEFAULT_LOCALE, key, values);
  };

  return {
    t,
    isLocaleSupported
  };
};

export default useLocale;
