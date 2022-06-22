import clsx from 'clsx';
import { memo } from 'react';

import { CheckIcon } from '../../icons';
import { Heading } from '../Heading';

type LogoProps = { className?: string };

const LogoView = ({ className }: LogoProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-start gap-2 relative',
        className,
      )}
    >
      <CheckIcon className='w-6 h-6 text-violet-500' />
      <Heading>Todo App</Heading>
      <span className='self-start lg:absolute lg:-top-6 lg:-left-4 p-1 pl-2 pr-2 -ml-1 text-xs font-bold text-white rounded-full bg-violet-500'>
        In Progress
      </span>
    </div>
  );
};

export const Logo = memo(LogoView);
