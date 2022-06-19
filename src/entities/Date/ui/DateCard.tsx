import clsx from 'clsx';
import { format } from 'date-fns';
import { memo } from 'react';

import { Button, Typography } from '~/shared/components';

type DateCardProps = {
  date: string;
  isSelected?: boolean;
  isCurrent?: boolean;
  onClick: () => void;
};

const DateCardView = ({
  date,
  isSelected = false,
  isCurrent = false,
  onClick,
}: DateCardProps) => {
  const fullDate = new Date(date);

  const formattedDateMonth = format(fullDate, 'MM');
  const formattedDateWeek = format(fullDate, 'EEE');
  const formattedDateDay = format(fullDate, 'dd');

  return (
    <Button
      bordered
      className={clsx(
        'flex-col w-16 h-16 gap-0 select-none shrink-0',
        isCurrent && !isSelected && 'bg-green-300 border-green-300',
      )}
      type={isSelected ? 'primary' : 'ghost'}
      onClick={onClick}
    >
      <div className='flex gap-0.5 font-normal'>
        <Typography uppercase size='sm'>
          {formattedDateWeek},
        </Typography>
        <Typography uppercase size='sm'>
          {formattedDateMonth}
        </Typography>
      </div>
      <Typography bold className='leading-none' size='xl'>
        {formattedDateDay}
      </Typography>
    </Button>
  );
};

export const DateCard = memo(DateCardView);
