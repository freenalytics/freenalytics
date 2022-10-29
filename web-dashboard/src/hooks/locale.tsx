import { useCallback } from 'react';
import { DEFAULT_LOCALE, isLocaleSupported, translate, LocalizedTranslateFunction } from '../i18n';

const useLocale = () => {
  const t: LocalizedTranslateFunction = useCallback((key, values = {}): string => {
    return translate(DEFAULT_LOCALE, key, values);
  }, [DEFAULT_LOCALE]);

  return {
    t,
    isLocaleSupported,
    currentLocale: DEFAULT_LOCALE
  };
};

export default useLocale;
