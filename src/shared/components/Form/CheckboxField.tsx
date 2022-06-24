import clsx from 'clsx';
import { InputHTMLAttributes, memo, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CheckIcon } from '~/shared/icons';

type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'id'
> & { label: string };

const CheckboxFieldView = ({
  label,
  className,
  checked,
  ...props
}: CheckboxFieldProps) => {
  const id = useMemo(() => uuidv4().slice(0, 8), []);

  return (
    <label
      className={clsx(
        'cursor-pointer flex gap-2 select-none items-center overflow-hidden break-all',
        checked && 'line-through',
        className,
      )}
      htmlFor={id}
    >
      <input
        checked={checked}
        className='hidden-visually'
        id={id}
        type='checkbox'
        {...props}
      />
      <CheckIcon
        aria-hidden
        className={clsx(
          'shrink-0 w-5 h-5 p-0.5 border-2 bg-transparent flex justify-center items-center border-gray-400 text-transparent rounded-full transition-colors duration-150 ease-in-out',
          checked && '!text-white !bg-violet-500 !border-violet-500',
        )}
      />
      {label}
    </label>
  );
};

export const CheckboxField = memo(CheckboxFieldView);
