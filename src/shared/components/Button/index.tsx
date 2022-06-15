import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const ButtonView = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        className={clsx(
          'flex items-center gap-2 leading-none appearance-none transition-colors duration-150 ease-in-out hover:brightness-90 text-center p-2 disabled:grayscale-80 disabled:hover:brightness-100',
          className,
        )}
        ref={ref}
        type='button'
        {...props}
      >
        {children}
      </button>
    );
  },
);

export const Button = memo(ButtonView);
