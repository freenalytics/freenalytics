import InlMessageFormat, { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';
import strings from './strings';

export type TranslateValues = Record<string, PrimitiveType | FormatXMLElementFn<string, string | string[]>>;

export const DEFAULT_LOCALE = 'en';

export const AVAILABLE_LOCALES = {
  en: 'English'
};

export const isLocaleSupported = (locale: string): boolean => {
  return Object.keys(AVAILABLE_LOCALES).includes(locale);
};

export const getMessage = (locale: string, key: string): InlMessageFormat => {
  const messagesForLocale = strings[locale];
  if (!messagesForLocale) {
    throw new Error(`No messages for locale ${locale} exist.`);
  }

  const message = messagesForLocale[key] || strings[DEFAULT_LOCALE][key];
  if (!message) {
    throw new Error(`No message with key ${key} for locale ${locale} exists.`);
  }

  return new InlMessageFormat(message);
};

export const translate = (locale: string, key: string, values: TranslateValues = {}): string => {
  return getMessage(locale, key).format(values) as string;
};
