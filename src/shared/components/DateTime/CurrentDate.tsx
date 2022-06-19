import clsx from 'clsx';
import { format } from 'date-fns';
import { memo } from 'react';

type CurrentDateProps = { className?: string };

const CutrrentDateView = ({ className }: CurrentDateProps) => {
  const date = format(new Date(), 'dd MMM yyyy');

  return (
    <time className={clsx('text-sm text-gray-400', className)} dateTime={date}>
      {date}
    </time>
  );
};

export const CutrrentDate = memo(CutrrentDateView);
