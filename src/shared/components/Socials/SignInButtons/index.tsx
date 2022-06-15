import { memo, ReactNode } from 'react';

import { signInWithGithub, signInWithGoogle } from '~/shared/api';
import { GithubIcon, GitlabIcon, GoogleIcon } from '~/shared/icons';

import { Button } from '../../Button';
import { Typography } from '../../Typography';

const socials: { text: string; icon: ReactNode; action: () => void }[] = [
  {
    text: 'Continue with Google',
    action: signInWithGoogle,
    icon: <GoogleIcon className='w-6 h-6' />,
  },
  {
    text: 'Continue with Github',
    action: signInWithGithub,
    icon: <GithubIcon className='w-6 h-6' />,
  },
  {
    text: 'Continue with Gitlab',
    action: signInWithGoogle,
    icon: <GitlabIcon className='w-6 h-6' />,
  },
];

const SignInButtonsView = () => {
  return (
    <div className='flex flex-col gap-4'>
      {socials.map((item) => (
        <Button
          className='pt-2 pb-2 border-2 border-gray-400 rounded-lg hover:border-violet hover:text-violet'
          key={item.text}
          onClick={item.action}
        >
          {item.icon}
          <Typography className='font-bold'>{item.text}</Typography>
        </Button>
      ))}
    </div>
  );
};

export const SignInButtons = memo(SignInButtonsView);
