import { reflect } from '@effector/reflect';
import Popover, {
  PopoverPlacement,
  PopoverTriggerType,
} from '@idui/react-popover';
import type { User as UserType } from '@supabase/supabase-js';

import { Button, Typography } from '~/shared/components';

import { selectors } from '../model';

type UserProps = {
  user: UserType | null;
  signOut: () => void;
};

const UserView = ({ user, signOut }: UserProps) => {
  return (
    user && (
      <div className='relative'>
        <Popover
          closeOnEnter
          closeOnEscape
          closeOnRemoteClick
          closeOnScroll
          className='!rounded-lg !p-0 !overflow-hidden !whitespace-nowrap font-bold'
          content={
            <>
              <Button className='justify-center w-full p-4 rounded-none hover:bg-violet hover:text-white'>
                Settings
              </Button>
              <Button
                className='justify-center w-full p-4 rounded-none hover:bg-violet hover:text-white'
                onClick={signOut}
              >
                Sign Out
              </Button>
            </>
          }
          offset={[0, -5]}
          placement={PopoverPlacement.bottomRight}
          trigger={PopoverTriggerType.hover}
          withArrow={false}
        >
          <Button className='flex items-center gap-2 p-0 cursor-pointer'>
            <Typography bold>
              {user.user_metadata.name ? user.user_metadata.name : 'User'}
            </Typography>
            <img
              alt='user avatar'
              className='rounded-full'
              height={40}
              src={
                user.user_metadata.avatar_url
                  ? user.user_metadata.avatar_url
                  : 'https://i.pravatar.cc/300'
              }
              width={40}
            />
          </Button>
        </Popover>
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
