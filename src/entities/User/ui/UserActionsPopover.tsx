import clsx from 'clsx';
import { memo, PropsWithChildren } from 'react';

import { Button } from '~/shared/components';
import { Popover } from '~/shared/lib';
import { PopoverActionButton } from '~/shared/types';

type UserActionsPopoverProps = PropsWithChildren<{
  actions: PopoverActionButton[];
}>;

const UserActionsPopoverView = ({
  actions,
  children,
}: UserActionsPopoverProps) => {
  return (
    <Popover
      contentNode={
        <div className='flex flex-col overflow-hidden bg-white shadow-md rounded-xl'>
          {actions.map((action) => (
            <Button
              className={clsx('p-4', action.className)}
              key={action.name}
              rounded={false}
              type='ghost'
              onClick={action.onAction}
            >
              {action.content}
            </Button>
          ))}
        </div>
      }
      placement='bottom-end'
      triggerNode={children}
    />
  );
};

export const UserActionsPopover = memo(UserActionsPopoverView);
