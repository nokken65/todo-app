import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { authApi } from '~/features/auth';
import { Heading, Socials } from '~/shared/components';
import { CheckIcon, GithubIcon, GitlabIcon, GoogleIcon } from '~/shared/icons';
import { SocialButton } from '~/shared/types';

const socials: SocialButton[] = [
  {
    text: 'Continue with Google',
    action: authApi.signInWithGoogle,
    icon: <GoogleIcon className='w-6 h-6' />,
  },
  {
    text: 'Continue with Github',
    action: authApi.signInWithGithub,
    icon: <GithubIcon className='w-6 h-6' />,
  },
  {
    text: 'Continue with Gitlab',
    action: authApi.signInWithGoogle,
    icon: <GitlabIcon className='w-6 h-6' />,
  },
];

const WelcomeRoute = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full max-w-screen-sm min-h-screen gap-12 m-0 ml-auto mr-auto p-9'>
      <div className='flex items-center justify-start gap-2'>
        <CheckIcon className='w-6 h-6 text-violet dark:text-white' />
        <Heading>Todo App</Heading>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Suspense fallback={<span className='h-10' />}>
          <Outlet />
        </Suspense>
        <span className='bg-gray-300 blockw-full h-0.5' />
        <Socials.SignInButtons buttons={socials} />
      </div>
    </div>
  );
};

export default WelcomeRoute;
