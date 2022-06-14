import { memo, SVGAttributes } from 'react';

type EditIconSvgProps = SVGAttributes<SVGElement>;

const EditIconSvg = ({ ...props }: EditIconSvgProps) => {
  return (
    <svg
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z' />
    </svg>
  );
};

export const EditIcon = memo(EditIconSvg);
