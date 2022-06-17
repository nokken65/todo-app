import clsx from 'clsx';

import { Button, Heading, Typography } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

import { Notification } from '../model/model';

type NotificationToastProps = Notification & {
  onClose: () => void;
};

export const NotificationToast = ({
  content,
  type,
  duration = 0,
  onClose,
}: NotificationToastProps) => {
  return (
    <div
      className={clsx(
        'w-full border-l-8 overflow-hidden shadow-lg',
        type === 'message' && 'border-violet-600',
        type === 'warn' && 'border-yellow-400',
        type === 'error' && 'border-red-400',
      )}
    >
      <div className='relative w-full h-full backdrop-blur-md bg-violet-50 bg-opacity-80'>
        {!!duration && (
          <div
            className={clsx(
              'absolute left-0 top-0 -z-10 w-full h-full animate-expire blur-md scale-x-110 scale-y-150',
              type === 'message' && 'bg-violet-100',
              type === 'warn' && 'bg-yellow-100',
              type === 'error' && 'bg-red-100',
            )}
            style={{ animationDuration: `${duration}ms` }}
          />
        )}
        <div className='flex flex-col p-2'>
          <div className='flex gap-4 items-center justify-between'>
            <Heading
              className={clsx(
                type === 'message' && 'text-violet-600',
                type === 'warn' && 'text-yellow-500',
                type === 'error' && 'text-red-600',
              )}
              type='h5'
            >
              {type}
            </Heading>
            <Button className='z-10' onClick={onClose}>
              <AddIcon className='w-4 h-4 rotate-45' />
            </Button>
          </div>
          <Typography>{content}</Typography>
        </div>
      </div>
    </div>
  );
};
