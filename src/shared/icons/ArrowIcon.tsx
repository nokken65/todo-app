import clsx from 'clsx';
import { memo, SVGAttributes } from 'react';

type Direction = 'top' | 'right' | 'bottom' | 'left';

type ArrowIconSvgProps = SVGAttributes<SVGElement> & {
  direction?: Direction;
};

const rotateMap: Record<Direction, string> = {
  top: 'rotate-90',
  right: 'rotate-180',
  bottom: '-rotate-90',
  left: '',
};

const ArrowIconSvg = ({
  direction = 'top',
  className,
  ...props
}: ArrowIconSvgProps) => {
  const rotateStyle = rotateMap[direction];

  return (
    <svg
      className={clsx(rotateStyle, className)}
      height='20'
      viewBox='0 0 24 24'
      width='20'
      {...props}
    >
      <path d='M17.28 24c-.57 0-1.14-.22-1.58-.66L4.5 12 15.7.66a2.21 2.21 0 0 1 3.15 0c.87.88.87 2.3 0 3.18L10.79 12l8.06 8.16c.87.88.87 2.3 0 3.18-.44.44-1 .66-1.57.66' />
    </svg>
  );
};

export const ArrowIcon = memo(ArrowIconSvg);
