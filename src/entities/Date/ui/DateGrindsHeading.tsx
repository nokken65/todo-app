import { reflect } from '@effector/reflect';

import { format } from '~/shared/utils';

import { selectors } from '../model';

type DateGrindsHeadingProps = {
  date: string;
};

const DateGrindsHeadingView = ({ date }: DateGrindsHeadingProps) => {
  const formattedDate = format(new Date(date), { weekday: 'long' });

  return <span className='text-violet-500'>{formattedDate}</span>;
};

export const DateGrindsHeading = reflect({
  view: DateGrindsHeadingView,
  bind: {
    date: selectors.$selectedDate,
  },
});
