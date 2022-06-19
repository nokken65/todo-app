import { reflect } from '@effector/reflect';
import { format } from 'date-fns';

import { selectors } from '../model';

type DateGrindsHeadingProps = {
  date: string;
};

const DateGrindsHeadingView = ({ date }: DateGrindsHeadingProps) => {
  const formattedDate = format(new Date(date), 'EEEE');

  return <span className='text-violet-500'>{formattedDate}</span>;
};

export const DateGrindsHeading = reflect({
  view: DateGrindsHeadingView,
  bind: {
    date: selectors.$selectedDate,
  },
});
