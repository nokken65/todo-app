import { DateString } from '../../types';
import { format } from './format';
import { range } from './range';

type Options = {
  from: DateString;
  to: DateString;
};

type FormattedRangeFn = (
  options: Options & { pattern?: string },
) => DateString[];

export const formattedRange: FormattedRangeFn = ({ from, to, pattern }) => {
  const rangeDates = range({ from, to });
  const formattedRangeDates = rangeDates.map((date) => format(date, pattern));

  return formattedRangeDates;
};
