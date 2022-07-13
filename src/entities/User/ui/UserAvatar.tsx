import { memo } from 'react';

type UserAvatarProps = {
  url?: string;
};

const UserAvatarView = ({ url }: UserAvatarProps) => {
  return url ? (
    <img
      alt='user avatar'
      className='w-10 h-10 rounded-full'
      height={40}
      src={url}
      width={40}
    />
  ) : (
    <span className='w-10 h-10 bg-gray-300 rounded-full' />
  );
};

export const UserAvatar = memo(UserAvatarView);
