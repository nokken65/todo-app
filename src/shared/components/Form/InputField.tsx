import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';

import { ErrorFeedback } from './ErrorFeedback';

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
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <div className='relative flex flex-col grow min-w-[200px]'>
        <div
          className={clsx(
            'flex grow overflow-hidden text-lg bg-white border-2 border-gray-300 rounded-lg',
            isValid && '!border-violet-500',
            errorMessage && '!border-red-300',
            className,
          )}
        >
          {before}
          <input
            className='flex pl-2 pr-2 grow placeholder:text-gray-300 focus-within:outline-none'
            disabled={isSubmitting}
            ref={ref}
            {...props}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          {after}
        </div>
        {errorMessage && isFocused && (
          <ErrorFeedback
            className='absolute bottom-full tooltip'
            message={errorMessage}
          />
        )}
      </div>
    );
  },
);
