import { memo, SVGAttributes } from 'react';

type CloseIconSvgProps = SVGAttributes<SVGElement>;

const CloseIconSvg = ({ ...props }: CloseIconSvgProps) => {
  return (
    <svg
      fill='none'
      height='12'
      viewBox='0 0 12 12'
      width='12'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6 1V11M1 6H11'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
        transform='rotate(45 6 6)'
      />
    </svg>
  );
};

export const CloseIcon = memo(CloseIconSvg);
