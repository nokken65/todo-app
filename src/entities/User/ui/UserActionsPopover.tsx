import Popover, {
  PopoverPlacement,
  PopoverTriggerType,
} from '@idui/react-popover';
import clsx from 'clsx';
import { memo, ReactChild } from 'react';

import { Button } from '~/shared/components';
import { PopoverActionButton } from '~/shared/types';

type UserActionsPopoverProps = {
  actions: PopoverActionButton[];
  children: ReactChild;
};

const UserActionsPopoverView = ({
  actions,
  children,
}: UserActionsPopoverProps) => {
  return (
    <Popover
      closeOnEnter
      closeOnEscape
      closeOnRemoteClick
      closeOnScroll
      animation={{
        initial: { opacity: 0, translateY: -50 },
        animate: { opacity: 1, translateY: 0 },
        exit: { opacity: 0, translateY: -50, transition: { duration: 0.1 } },
      }}
      className='!rounded-lg !p-0 !overflow-hidden !shadow-md'
      content={
        <div className='flex flex-col'>
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
      offset={[0, -5]}
      openingAnimationTranslateDistance={0}
      placement={PopoverPlacement.bottomRight}
      trigger={PopoverTriggerType.click}
      withArrow={false}
    >
      {children}
    </Popover>
  );
};

export const UserActionsPopover = memo(UserActionsPopoverView);
