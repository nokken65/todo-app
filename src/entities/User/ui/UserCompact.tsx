import { reflect } from '@effector/reflect';
import type { User as UserType } from '@supabase/supabase-js';

import { Button, Typography } from '~/shared/components';

import { selectors } from '../model';
import { UserActionsPopover } from './UserActionsPopover';
import { UserAvatar } from './UserAvatar';

type UserProps = {
  user: UserType | null;
  signOut: () => void;
};

const UserCompactView = ({ user, signOut }: UserProps) => {
  return (
    user && (
      <UserActionsPopover
        actions={[
          {
            name: 'settings',
            content: 'Settings',
          },
          {
            name: 'signOut',
            content: 'Sign Out',
            onAction: signOut,
          },
        ]}
      >
        <span>
          <Button type='ghost'>
            <Typography bold className='lg:hidden'>
              {user.user_metadata.name ? user.user_metadata.name : 'User'}
            </Typography>
            <UserAvatar url={user.user_metadata.avatar_url} />
          </Button>
        </span>
      </UserActionsPopover>
    )
  );
};

export const UserCompact = reflect({
  view: UserCompactView,
  bind: {
    user: selectors.$user,
  },
});
