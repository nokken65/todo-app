import { memo, SVGAttributes } from 'react';

type CheckIconSvgProps = SVGAttributes<SVGElement>;

const CheckIconSvg = ({ ...props }: CheckIconSvgProps) => {
  return (
    <svg
      fill='none'
      height='7'
      viewBox='0 0 9 7'
      width='9'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3.64645 5.61331L2.94487 6.3259C3.33626 6.71124 3.96518 6.7088 4.35356 6.32042L3.64645 5.61331ZM8.32043 2.35355C8.71095 1.96303 8.71095 1.32986 8.32043 0.939336C7.92991 0.548812 7.29674 0.548812 6.90622 0.939336L8.32043 2.35355ZM2.20158 2.78741C1.80803 2.39994 1.17489 2.40487 0.787413 2.79842C0.399939 3.19197 0.404865 3.82511 0.798416 4.21259L2.20158 2.78741ZM4.35356 6.32042L8.32043 2.35355L6.90622 0.939336L2.93935 4.90621L4.35356 6.32042ZM4.34804 4.90073L2.20158 2.78741L0.798416 4.21259L2.94487 6.3259L4.34804 4.90073Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const CheckIcon = memo(CheckIconSvg);
