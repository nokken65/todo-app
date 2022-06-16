import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';

import { LoaderRingIcon } from '~/shared/icons';

export type ButtonWithLoaderProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

const ButtonWithLoaderView = forwardRef<
  HTMLButtonElement,
  ButtonWithLoaderProps
>(({ children, isLoading, className, ...props }, ref) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-2 leading-none appearance-none transition-colors duration-150 ease-in-out hover:brightness-90 text-center',
        className,
      )}
      ref={ref}
      type='button'
      {...props}
    >
      {isLoading ? (
        <LoaderRingIcon className='w-6 h-6 animate-spin-fast' />
      ) : (
        children
      )}
    </button>
  );
});

export const ButtonWithLoader = memo(ButtonWithLoaderView);
