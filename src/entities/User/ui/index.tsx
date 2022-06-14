import { reflect } from '@effector/reflect';
import type { User as UserType } from '@supabase/supabase-js';
import { useState } from 'react';

import { signOut } from '~/shared/api';
import { Button, Typography } from '~/shared/components';

import { selectors } from '../model';

type UserProps = {
  user: UserType | null;
};

const UserView = ({ user }: UserProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    user && (
      <div className='relative'>
        <Button
          className='flex items-center gap-2 p-0 cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Typography bold>{user.user_metadata.name}</Typography>
          <img
            alt='user avatar'
            className='w-10 rounded-full'
            src={user.user_metadata.avatar_url}
          />
        </Button>
        {isExpanded && (
          <ul className='absolute left-0 z-10 flex flex-col w-full mt-2 overflow-hidden rounded-lg bg-gray-pale top-full'>
            <li>
              <Button className='justify-center w-full rounded-none hover:bg-violet hover:text-white'>
                <Typography bold className='w-full' size='sm'>
                  Settings
                </Typography>
              </Button>
            </li>
            <li>
              <Button
                className='justify-center w-full rounded-none hover:bg-violet hover:text-white'
                onClick={signOut}
              >
                <Typography bold className='w-full' size='sm'>
                  Sign Out
                </Typography>
              </Button>
            </li>
          </ul>
        )}
      </div>
    )
  );
};

export const User = reflect({
  view: UserView,
  bind: {
    user: selectors.$user,
  },
});
