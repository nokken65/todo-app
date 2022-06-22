import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { DateString } from '../../types';

type Options = {
  from: DateString;
  to: DateString;
};

type RangeFn = (options: Options) => Date[];

export const range: RangeFn = ({ from, to }) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const rangeDates = eachDayOfInterval({ start: fromDate, end: toDate });

  return rangeDates;
};
