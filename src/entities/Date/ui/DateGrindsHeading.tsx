import { reflect } from '@effector/reflect';

import type { DateString } from '~/shared/types';
import { format } from '~/shared/utils';

import { selectors } from '../model';

type DateGrindsHeadingProps = {
  date: DateString;
};

const DateGrindsHeadingView = ({ date }: DateGrindsHeadingProps) => {
  const formattedDate = format(date, 'EEEE');

  return <span className='text-violet-500'>{formattedDate}</span>;
};

export const DateGrindsHeading = reflect({
  view: DateGrindsHeadingView,
  bind: {
    date: selectors.$selectedDate,
  },
});
