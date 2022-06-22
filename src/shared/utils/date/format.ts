import formatDate from 'date-fns/format';

import { DateString } from '../../types';

type FormatFn = (date: Date | DateString, pattern?: string) => DateString;

export const format: FormatFn = (date, pattern = 'yyyy-MM-dd') => {
  let dateObj: Date;
  if (typeof date === 'string' || date instanceof String) {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  const formatted: DateString = formatDate(dateObj, pattern);

  return formatted;
};
