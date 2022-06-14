import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isValid?: boolean;
  isError?: boolean;
  isSubmitting?: boolean;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      isValid = false,
      isError = false,
      isSubmitting = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        className={clsx(
          'w-full h-full focus-within:outline-4 focus-within:outline focus-within:outline-blue-200 placeholder:text-gray-300 pl-2 pr-2 border-2 rounded-lg text-lg border-gray-300',
          isValid && 'border-teal-300',
          isError && 'border-red-300',
          className,
        )}
        disabled={isSubmitting}
        ref={ref}
        {...props}
      />
    );
  },
);
