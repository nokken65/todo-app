import clsx from 'clsx';
import { ButtonHTMLAttributes, memo } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const ButtonView = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'flex items-center gap-2 leading-none rounded-lg appearance-none transition-colors duration-150 ease-in-out hover:brightness-90 text-center p-2 disabled:grayscale-80 disabled:hover:brightness-100',
        className,
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = memo(ButtonView);
