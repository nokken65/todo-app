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
      className={clsx(
        'flex-col w-16 h-16 bg-gray-pale text-gray-light justify-center gap-0 select-none font-normal rounded-lg',
        isCurrent && !isSelected && 'text-gray bg-green-pale',
        isSelected && '!text-white !bg-violet',
      )}
      onClick={onClick}
    >
      <div className='flex gap-0.5'>
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
