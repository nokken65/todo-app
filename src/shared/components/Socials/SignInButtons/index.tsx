import clsx from 'clsx';
import { memo } from 'react';

import { SocialButton } from '~/shared/types';

import { Button } from '../../Button/Button';
import { Typography } from '../../Typography';

type SignInButtonsProps = {
  buttons: SocialButton[];
};

const SignInButtonsView = ({ buttons }: SignInButtonsProps) => {
  return (
    <div className='flex flex-col w-[250px] gap-4'>
      {buttons.map((item) => (
        <Button
          bordered
          className={clsx('justify-between', item.className)}
          key={item.text}
          type='ghost'
          onClick={item.action}
        >
          {item.icon}
          <Typography bold className='w-full'>
            {item.text}
          </Typography>
        </Button>
      ))}
    </div>
  );
};

export const SignInButtons = memo(SignInButtonsView);
