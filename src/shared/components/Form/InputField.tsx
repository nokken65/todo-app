import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isValid?: boolean;
  isError?: boolean;
  isSubmitting?: boolean;
  before?: ReactNode;
  after?: ReactNode;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      isValid = false,
      isError = false,
      isSubmitting = false,
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
          'flex w-full overflow-hidden text-lg bg-white border-2 border-gray-300 rounded-lg focus-within:outline focus-within:outline-4 focus-within:outline-blue-200',
          isValid && 'border-violet-600',
          isError && 'border-red-300',
          className,
        )}
      >
        {before}
        <input
          className='w-full h-full pl-2 pr-2 placeholder:text-gray-300 focus-within:outline-none'
          disabled={isSubmitting}
          ref={ref}
          {...props}
        />
        {after}
      </div>
    );
  },
);
