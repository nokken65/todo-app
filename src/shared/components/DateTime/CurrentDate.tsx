import { format } from 'date-fns';
import { memo } from 'react';

const CutrrentDateView = () => {
  const date = format(new Date(), 'dd MMM yyyy');

  return (
    <time className='text-sm text-gray-light' dateTime={date}>
      {date}
    </time>
  );
};

export const CutrrentDate = memo(CutrrentDateView);
