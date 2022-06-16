import { useNavigate } from 'react-router-dom';

import { SignInWithEmailForm } from '~/features/auth';
import { Button } from '~/shared/components';
import { ROUTE_PATHS } from '~/shared/constants';

const SignInRoute = () => {
  return <SignInWithEmailForm />;
};

const SignInActionButtonRoute = () => {
  const navigate = useNavigate();

  return (
    <Button
      className='justify-center w-full h-10 font-bold text-white rounded-lg bg-violet-600 border-violet-600'
      onClick={() => navigate(ROUTE_PATHS.signin)}
    >
      Login
    </Button>
  );
};

export { SignInActionButtonRoute };
export default SignInRoute;
