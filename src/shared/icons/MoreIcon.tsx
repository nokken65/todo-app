import { memo, SVGAttributes } from 'react';

type MoreIconSvgProps = SVGAttributes<SVGElement>;

const MoreIconSvg = ({ ...props }: MoreIconSvgProps) => {
  return (
    <svg
      fill='none'
      height='2'
      viewBox='0 0 6 2'
      width='6'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M6 1C6 1.55228 5.55228 2 5 2C4.44772 2 4 1.55228 4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1Z'
        fill='currentColor'
      />
      <path
        d='M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const MoreIcon = memo(MoreIconSvg);
