import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from 'react';

import { LoaderRingIcon } from '~/shared/icons';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  icon?: ReactNode;
  type?: 'primary' | 'ghost';
  bordered?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  loader?: ReactNode;
  htmlType?: 'submit' | 'reset' | 'button' | undefined;
};

const ButtonView = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      type = 'primary',
      rounded = true,
      bordered = false,
      isLoading = false,
      loader = <LoaderRingIcon className='w-6 h-6 animate-spin-fast' />,
      htmlType = 'button',
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={clsx(
          'btn',
          rounded && 'rounded-lg',
          bordered && 'border-2',
          type === 'primary' && 'btn-primary',
          type === 'ghost' && 'btn-ghost',
          className,
        )}
        disabled={isLoading || disabled}
        ref={ref}
        type={htmlType === 'submit' ? 'submit' : 'button'}
        {...props}
      >
        {isLoading ? loader : icon}
        {children}
      </button>
    );
  },
);

export const Button = memo(ButtonView);
