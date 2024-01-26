import {
  getDay,
  getYear,
  getMonth,
  getDate,
  endOfMonth,
  getHours,
  getMinutes,
  getSeconds,
  addYears,
  addMonths,
  addDays,
  setYear,
  setMonth,
  setDate,
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  isValid,
  getWeek,
  startOfWeek,
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import generateCalendar from 'antd/lib/calendar/generateCalendar';

/*
 * Generate and export pickers that use date-fns instead of moment as their date library.
 *
 * This config is a modified version of https://github.com/react-component/picker/blob/v2.5.19/src/generate/dateFns.ts
 * Copy-pasting that was cheaper than adding the whole react-component/picker library
 * for the sake of importing a single configuration file.
 */

/*
 * Since we only support English and Spanish languages, it makes sense to only support two locales as well.
 * If we were to try and support every locale, we'd need to import the whole date-fns/locale package up front,
 * which would disable tree-shaking at build-time and significantly increase bundle size.
 *
 * Another, better solution, would be to lazily load necessary locales when a user changes their language. However,
 * that would require a big refactoring effort.
 */
const getLocaleByName = (localeName: string) => (localeName.startsWith('es') ? es : enUS);

const localeParse = (format: string) =>
  format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');

const generateConfig = {
  // get
  getNow: () => new Date(),
  getFixedDate: (str: string) => new Date(str),
  getEndDate: (date: Date) => endOfMonth(date),
  getWeekDay: (date: Date) => getDay(date),
  getYear: (date: Date) => getYear(date),
  getMonth: (date: Date) => getMonth(date),
  getDate: (date: Date) => getDate(date),
  getHour: (date: Date) => getHours(date),
  getMinute: (date: Date) => getMinutes(date),
  getSecond: (date: Date) => getSeconds(date),

  // set
  addYear: (date: Date, diff: number) => addYears(date, diff),
  addMonth: (date: Date, diff: number) => addMonths(date, diff),
  addDate: (date: Date, diff: number) => addDays(date, diff),
  setYear: (date: Date, year: number) => setYear(date, year),
  setMonth: (date: Date, month: number) => setMonth(date, month),
  setDate: (date: Date, num: number) => setDate(date, num),
  setHour: (date: Date, hour: number) => setHours(date, hour),
  setMinute: (date: Date, minute: number) => setMinutes(date, minute),
  setSecond: (date: Date, second: number) => setSeconds(date, second),

  // Compare
  isAfter: (date1: Date, date2: Date) => isAfter(date1, date2),
  isValidate: (date: Date) => isValid(date),

  locale: {
    getWeekFirstDay: (locale: string) => {
      const clone = getLocaleByName(locale);
      return clone.options!.weekStartsOn!;
    },
    getWeekFirstDate: (locale: string, date: Date) => startOfWeek(date, { locale: getLocaleByName(locale) }),
    getWeek: (locale: string, date: Date) => getWeek(date, { locale: getLocaleByName(locale) }),
    getShortWeekDays: (locale: string) => {
      const clone = getLocaleByName(locale);
      return Array.from({ length: 7 }).map((_, i) => clone.localize!.day(i, { width: 'short' }));
    },
    getShortMonths: (locale: string) => {
      const clone = getLocaleByName(locale);
      return Array.from({ length: 12 }).map((_, i) => clone.localize!.month(i, { width: 'abbreviated' }));
    },
    format: (locale: string, date: Date, format: string) => {
      if (!isValid(date)) {
        return '';
      }
      return formatDate(date, localeParse(format), {
        locale: getLocaleByName(locale),
      });
    },
    parse: (locale: string, text: string, formats: string[]) => {
      for (let i = 0; i < formats.length; i++) {
        const format = localeParse(formats[i]);
        const formatText = text;
        const date = parseDate(formatText, format, new Date(), {
          locale: getLocaleByName(locale),
        });
        if (isValid(date)) {
          return date;
        }
      }
      return null;
    },
  },
};

const DatePicker = generatePicker(generateConfig);
const Calendar = generateCalendar(generateConfig);
export { DatePicker, Calendar };
