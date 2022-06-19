import { memo, ProgressHTMLAttributes } from 'react';

import { validatePercents } from '~/shared/utils';

type ProgressProps = Omit<
  ProgressHTMLAttributes<HTMLProgressElement>,
  'value'
> & { value?: number };

const ProgressView = ({ value = 0 }: ProgressProps) => {
  return (
    <div className='w-full h-2 overflow-hidden bg-violet-200 rounded-3xl'>
      <div
        className='h-2 transition-all duration-200 ease-in-out bg-violet-500 rounded-3xl'
        style={{ width: `${validatePercents(value)}%` }}
      />
    </div>
  );
};

export const Progress = memo(ProgressView);
