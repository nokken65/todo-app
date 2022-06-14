import { Heading, Socials } from '~/shared/components';
import { CheckIcon } from '~/shared/icons';

const SignInRoute = () => {
  return (
    <div className='w-full min-h-screen h-full flex flex-col justify-center items-center p-9 gap-12 min-w-[320px]'>
      <div className='flex justify-start items-center gap-2'>
        <CheckIcon className='w-6 h-6 text-violet dark:text-white' />
        <Heading>Todo App</Heading>
      </div>
      <Socials.SignInButtons />
    </div>
  );
};

export default SignInRoute;
