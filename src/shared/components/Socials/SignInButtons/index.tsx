import clsx from 'clsx';
import { memo } from 'react';

import { SocialButton } from '~/shared/types';

import { Button } from '../../Button';
import { Typography } from '../../Typography';

type SignInButtonsProps = {
  buttons: SocialButton[];
};

const SignInButtonsView = ({ buttons }: SignInButtonsProps) => {
  return (
    <div className='flex flex-col w-[250px] gap-4'>
      {buttons.map((item) => (
        <Button
          className={clsx(
            'pt-2 pb-2 border-2 border-gray-400 rounded-lg hover:border-violet-600 hover:text-violet-600 h-10 w-full justify-between',
            item.className,
          )}
          key={item.text}
          onClick={item.action}
        >
          {item.icon}
          <Typography className='w-full font-bold'>{item.text}</Typography>
        </Button>
      ))}
    </div>
  );
};

export const SignInButtons = memo(SignInButtonsView);
