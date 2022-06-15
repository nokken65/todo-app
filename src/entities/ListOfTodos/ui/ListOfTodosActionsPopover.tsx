import Popover, {
  PopoverPlacement,
  PopoverTriggerType,
} from '@idui/react-popover';
import clsx from 'clsx';
import { memo } from 'react';

import { Button } from '~/shared/components';
import { MoreIcon } from '~/shared/icons';
import { PopoverActionButton } from '~/shared/types';

type ListOfTodosActionsPopoverProps = {
  actions: PopoverActionButton[];
};

const ListOfTodosActionsPopoverView = ({
  actions,
}: ListOfTodosActionsPopoverProps) => {
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
              className={clsx(
                'p-5 pt-3 pb-3 font-bold !rounded-none hover:bg-violet-600 hover:text-white hover:brightness-100',
                action.className,
              )}
              key={action.name}
              onClick={action.onAction}
            >
              {action.content}
            </Button>
          ))}
        </div>
      }
      offset={[5, 0]}
      placement={PopoverPlacement.left}
      trigger={PopoverTriggerType.hover}
      withArrow={false}
    >
      <Button>
        <MoreIcon className='w-4 h-4 text-gray-500' />
      </Button>
    </Popover>
  );
};

export const ListOfTodosActionsPopover = memo(ListOfTodosActionsPopoverView);
