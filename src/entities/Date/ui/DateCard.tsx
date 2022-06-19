import clsx from 'clsx';
import { memo } from 'react';

import { Button, Typography } from '~/shared/components';
import { format } from '~/shared/utils';

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

  const formattedDateMonth = format(fullDate, { month: '2-digit' });
  const formattedDateWeek = format(fullDate, { weekday: 'short' });
  const formattedDateDay = format(fullDate, { day: '2-digit' });

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
