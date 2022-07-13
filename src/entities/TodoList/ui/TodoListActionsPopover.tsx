import clsx from 'clsx';
import { memo } from 'react';

import { Button } from '~/shared/components';
import { MoreIcon } from '~/shared/icons';
import { Popover } from '~/shared/lib';
import { PopoverActionButton } from '~/shared/types';

type TodoListActionsPopoverProps = {
  actions: PopoverActionButton[];
};

const TodoListActionsPopoverView = ({
  actions,
}: TodoListActionsPopoverProps) => {
  return (
    <Popover
      contentNode={
        <div className='flex flex-col overflow-hidden bg-white rounded-lg shadow-md'>
          {actions.map((action) => (
            <Button
              className={clsx('p-3', action.className)}
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
      placement='left-start'
      triggerNode={
        <Button className='h-10' type='ghost'>
          <MoreIcon className='w-4 h-4 text-gray-500' />
        </Button>
      }
    />
  );
};

export const TodoListActionsPopover = memo(TodoListActionsPopoverView);
