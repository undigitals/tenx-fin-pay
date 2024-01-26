import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { capitalizeWords } from './stringFormatter';

export const DATE_FORMAT = 'MM/dd/yyyy';

export const parseDate = (dateStr: string) => parse(dateStr, DATE_FORMAT, new Date());
export const formatDate = (val: Date) => format(val, DATE_FORMAT);
export const getValidDate = (dateString: string): string => {
  const regex = /^(\d{4}-\d{2}-\d{2})/;
  const matches = dateString.match(regex);
  return matches ? matches[1] : '';
};

export const formatLocaleDate = (val: Date, dateFormat: string, locale: string) => {
  const localeParams = locale.split('-')[0] === 'es' ? { locale: es } : {};
  return capitalizeWords(format(val, dateFormat, localeParams));
};
