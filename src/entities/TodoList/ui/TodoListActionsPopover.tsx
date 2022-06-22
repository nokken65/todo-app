import Popover, {
  PopoverPlacement,
  PopoverTriggerType,
} from '@idui/react-popover';
import clsx from 'clsx';
import { memo } from 'react';

import { Button } from '~/shared/components';
import { MoreIcon } from '~/shared/icons';
import { PopoverActionButton } from '~/shared/types';

type TodoListActionsPopoverProps = {
  actions: PopoverActionButton[];
};

const TodoListActionsPopoverView = ({
  actions,
}: TodoListActionsPopoverProps) => {
  return (
    <Popover
      closeOnEnter
      closeOnEscape
      closeOnRemoteClick
      closeOnScroll
      className='!rounded-lg !p-0 !overflow-hidden'
      content={
        <div className='flex flex-col'>
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
      offset={[5, 0]}
      placement={PopoverPlacement.leftTop}
      trigger={PopoverTriggerType.hover}
      withArrow={false}
    >
      <Button className='h-10' type='ghost'>
        <MoreIcon className='w-4 h-4 text-gray-500' />
      </Button>
    </Popover>
  );
};

export const TodoListActionsPopover = memo(TodoListActionsPopoverView);
