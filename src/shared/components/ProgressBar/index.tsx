import { memo } from 'react';

import { validatePercents } from '~/shared/utils';

type ProgressBarProps = { value: number };

const ProgressBarView = ({ value = 0 }: ProgressBarProps) => {
  return (
    <div className='w-full h-2 bg-gray-pale overflow-hidden rounded-3xl'>
      <div
        className='h-2 bg-violet rounded-3xl transition-all duration-200 ease-in-out'
        style={{ width: `${validatePercents(value)}%` }}
      />
    </div>
  );
};

export const ProgressBar = memo(ProgressBarView);
