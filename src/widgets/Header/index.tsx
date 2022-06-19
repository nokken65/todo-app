import { memo } from 'react';

import { UserCompact } from '~/entities/User';
import { authApi } from '~/features/auth';
import { Logo } from '~/shared/components';

const HeaderView = () => {
  return (
    <header className='flex items-center justify-between gap-4'>
      <Logo />
      <UserCompact signOut={authApi.signOut} />
    </header>
  );
};

export const Header = memo(HeaderView);
