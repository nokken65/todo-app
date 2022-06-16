import { memo } from 'react';

import { User } from '~/entities/User';
import { authApi } from '~/features/auth';
import { DateTime } from '~/shared/components';

const HeaderView = () => {
  return (
    <header className='flex items-start justify-between'>
      <DateTime.CutrrentDate />
      <User signOut={authApi.signOut} />
    </header>
  );
};

export const Header = memo(HeaderView);
