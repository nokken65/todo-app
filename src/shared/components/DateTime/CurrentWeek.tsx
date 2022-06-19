import { format } from 'date-fns';
import { memo } from 'react';

const CutrrentWeekView = () => {
  const date = format(new Date(), 'EEEE');

  return (
    <time className='text-violet-500' dateTime={date}>
      {date}
    </time>
  );
};

export const CutrrentWeek = memo(CutrrentWeekView);
