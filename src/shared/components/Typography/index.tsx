import clsx from 'clsx';
import { HTMLAttributes, memo } from 'react';

import { TextSize } from '~/shared/types';

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  size?: TextSize;
  bold?: boolean;
  uppercase?: boolean;
  italic?: boolean;
};

const TypographyView = ({
  size = 'base',
  bold = false,
  uppercase = false,
  italic = false,
  children,
  className,
  ...props
}: TypographyProps) => {
  return (
    <p
      {...props}
      className={clsx(
        // 'text-gray dark:text-white',
        `text-${size}`,
        bold && 'font-bold',
        uppercase && 'uppercase',
        italic && 'italic',
        className,
      )}
    >
      {children}
    </p>
  );
};

export const Typography = memo(TypographyView);
