import { memo } from 'react';

import { signInWithGithub, signInWithGoogle } from '~/shared/api';
import { GithubIcon, GitlabIcon, GoogleIcon } from '~/shared/icons';

import { Button } from '../../Button';
import { Typography } from '../../Typography';

const SignInButtonsView = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Button
        className='pt-2 pb-2 bg-white border border-gray hover:border-violet hover:text-violet'
        onClick={signInWithGoogle}
      >
        <GoogleIcon className='w-6 h-6' />
        <Typography className='font-bold'>Continue with Google</Typography>
      </Button>
      <Button
        className='pt-2 pb-2 bg-white border border-gray hover:border-violet hover:text-violet'
        onClick={signInWithGithub}
      >
        <GithubIcon className='w-6 h-6' />
        <Typography className='font-bold '>Continue with Github</Typography>
      </Button>
      <Button
        className='pt-2 pb-2 bg-white border border-gray hover:border-violet hover:text-violet'
        onClick={signInWithGoogle}
      >
        <GitlabIcon className='w-6 h-6' />
        <Typography className='font-bold '>Continue with Gitlab</Typography>
      </Button>
    </div>
  );
};

export const SignInButtons = memo(SignInButtonsView);
