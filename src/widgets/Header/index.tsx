import { memo } from 'react';

import { User } from '~/entities/User';
import { DateTime } from '~/shared/components';

const HeaderView = () => {
  return (
    <header className='flex items-start justify-between'>
      <DateTime.CutrrentDate />
      <User />
    </header>
  );
};

export const Header = memo(HeaderView);
