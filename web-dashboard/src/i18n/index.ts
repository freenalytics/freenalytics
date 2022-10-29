import { ReactElement } from 'react';
import InlMessageFormat, { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';
import strings from './strings';

export type ReactFormatFunction = (s: string) => ReactElement;
export type TranslateValuesForReact = Record<string, PrimitiveType | FormatXMLElementFn<string, string | string[]> | ReactFormatFunction>;
export type TranslateValues = Record<string, PrimitiveType | FormatXMLElementFn<string, string | string[]>>;

export type ValidLocale = keyof typeof strings;
export type MessageKey = keyof typeof strings.en; // en is the default locale, so it should have all keys.

export const DEFAULT_LOCALE: ValidLocale = 'en';
export const AVAILABLE_LOCALES = {
  en: 'English'
};

export const isLocaleSupported = (locale: string): boolean => {
  return Object.keys(AVAILABLE_LOCALES).includes(locale);
};

export const getMessage = (locale: ValidLocale, key: MessageKey): InlMessageFormat => {
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

export type TranslateFunction = (locale: ValidLocale, key: MessageKey, values?: TranslateValuesForReact) => string;
export type LocalizedTranslateFunction = (key: MessageKey, values?: TranslateValuesForReact) => string;

export const translate: TranslateFunction = (locale, key, values = {}): string => {
  return getMessage(locale, key).format(values as TranslateValues) as string;
};
