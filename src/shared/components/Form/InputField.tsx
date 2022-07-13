import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isValid?: boolean;
  errorMessage?: string;
  isSubmitting?: boolean;
  before?: ReactNode;
  after?: ReactNode;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      isValid = false,
      isSubmitting = false,
      errorMessage,
      className,
      before,
      after,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(
          'flex w-full h-full overflow-hidden text-lg bg-white border-2 border-gray-300 rounded-lg',
          isValid && '!border-violet-500',
          errorMessage && '!border-red-300',
          className,
        )}
      >
        {before}
        <input
          className='flex pl-2 pr-2 placeholder:text-gray-300 focus-within:outline-none'
          disabled={isSubmitting}
          ref={ref}
          size={10}
          {...props}
        />
        {after}
      </div>
    );
  },
);
