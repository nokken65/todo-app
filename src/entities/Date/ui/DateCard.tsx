import clsx from 'clsx';
import { memo, useMemo } from 'react';

import { Button, Typography } from '~/shared/components';
import type { DateString } from '~/shared/types';
import { format } from '~/shared/utils';

type DateCardProps = {
  date: DateString;
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
  const formattedDateMonth = useMemo(() => format(date, 'MM'), [date]);
  const formattedDateWeek = useMemo(() => format(date, 'EEE'), [date]);
  const formattedDateDay = useMemo(() => format(date, 'dd'), [date]);

  return (
    <Button
      bordered
      className={clsx(
        'flex-col w-16 h-16 gap-0 select-none shrink-0',
        isCurrent && !isSelected && 'bg-blue-300 border-blue-300',
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
