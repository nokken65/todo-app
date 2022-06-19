import { memo, SVGAttributes } from 'react';

type HideIconSvgProps = SVGAttributes<SVGElement> & { isHidden?: boolean };

const HideIconSvg = ({ isHidden, ...props }: HideIconSvgProps) => {
  return (
    <svg
      version='1.1'
      viewBox='0 0 32 32'
      x='0px'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      y='0px'
      {...props}
    >
      <path
        d='M29.8,15.4C29.6,15.1,23.6,7,16,7S2.4,15.1,2.2,15.4c-0.3,0.4-0.3,0.8,0,1.2C2.4,16.9,8.4,25,16,25s13.6-8.1,13.8-8.4
	C30.1,16.2,30.1,15.8,29.8,15.4z M16,21c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S18.8,21,16,21z'
        fill='currentColor'
      />
      <line
        display={isHidden ? 'none' : 'block'}
        stroke='currentColor'
        strokeWidth={3}
        x1='5'
        x2='27'
        y1='27'
        y2='5'
      />
    </svg>
  );
};

export const HideIcon = memo(HideIconSvg);
