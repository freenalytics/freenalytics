import { DEFAULT_LOCALE, isLocaleSupported, translate, TranslateValuesForReact, LocalizedTranslateFunction, MessageKey, ValidLocale } from '../i18n';

const useLocale = () => {
  const t: LocalizedTranslateFunction = (key: MessageKey, values: TranslateValuesForReact = {}): string => {
    return translate(DEFAULT_LOCALE, key, values);
  };

  return {
    t,
    isLocaleSupported,
    currentLocale: DEFAULT_LOCALE as ValidLocale
  };
};

export default useLocale;
