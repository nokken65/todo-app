import addDays from 'date-fns/addDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { DateString } from '../../types';
import { format } from './format';

type Options = {
  date: DateString;
  amount?: number;
};

type FormattedDistanceFn = (
  options: Options & { pattern?: string },
) => DateString[];

export const formattedDistance: FormattedDistanceFn = ({
  date,
  amount = 7,
  pattern,
}) => {
  const dateObj = new Date(date);
  const fromDate = addDays(dateObj, -amount);
  const toDate = addDays(dateObj, amount);
  const rangeDates = eachDayOfInterval({ start: fromDate, end: toDate });
  const formattedRangeDates = rangeDates.map((d) => format(d, pattern));

  return formattedRangeDates;
};
