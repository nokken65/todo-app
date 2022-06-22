import { reflect } from '@effector/reflect';

import { DateString } from '~/shared/types';
import { format } from '~/shared/utils';

import { selectors } from '../model';

type DateCurrentProps = {
  date: DateString;
};

const DateCurrentView = ({ date }: DateCurrentProps) => {
  const formattedDate = format(date, 'dd MMM yyyy');

  return <span className='text-sm text-gray-400'>{formattedDate}</span>;
};

export const DateCurrent = reflect({
  view: DateCurrentView,
  bind: {
    date: selectors.$currentDate,
  },
});
