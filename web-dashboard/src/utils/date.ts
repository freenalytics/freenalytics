import dayjs from 'dayjs';
import 'dayjs/locale/en';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ValidLocale, DEFAULT_LOCALE } from '../i18n';

dayjs.extend(customParseFormat);

const FORMAT = 'hh:mm:ss A (DD MMM YYYY)';

export const getFormattedDate = (date: string | Date, locale: ValidLocale = DEFAULT_LOCALE): string => {
  return dayjs(date).locale(locale).format(FORMAT);
};
