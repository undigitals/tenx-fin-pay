import i18next from 'i18next';

const monthsArr: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

export const getMonthDifferences = (lastActivityDate: Date) => {
  const lastActivity = new Date(lastActivityDate);
  const today = new Date();
  let months;
  months = (today.getFullYear() - lastActivity.getFullYear()) * 12;
  months -= lastActivity.getMonth();
  months += today.getMonth();
  return months <= 0 ? 0 : months;
};

export const getDayDifference = (lastActivityDate: Date) => {
  const lastActivity = new Date(lastActivityDate);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const timeDiff = Math.abs(today.getTime() - lastActivity.getTime());
  const days = Math.floor(timeDiff / oneDay);

  return days;
};

export const getFormattedDateFromString = (date: string) => {
  const shortDate = date.slice(0, 10).split('-');

  if (shortDate?.length === 3) {
    return `${i18next.t(`tenxPayHome.${monthsArr[shortDate[1]]}`)} ${shortDate[2]}`;
  }

  return date;
};
