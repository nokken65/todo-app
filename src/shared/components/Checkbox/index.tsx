import clsx from 'clsx';
import { InputHTMLAttributes, memo } from 'react';

import { CheckIcon } from '~/shared/icons';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const CheckboxView = ({
  name,
  checked,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center w-5 h-5 rounded-full border-2 border-gray relative transition-all duration-150 ease-in',
        checked && 'bg-violet text-white border-none',
        className,
      )}
    >
      <input
        checked={checked}
        className='appearance-none w-5 h-5 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'
        name={name}
        type='checkbox'
        {...props}
      />
      <CheckIcon className='w-3 h-3' />
    </div>
  );
};

export const Checkbox = memo(CheckboxView);
