import Popover, {
  PopoverPlacement,
  PopoverTriggerType,
} from '@idui/react-popover';
import { memo, PropsWithChildren } from 'react';

import { Button } from '~/shared/components';
import { MoreIcon } from '~/shared/icons';

type HeaderExtendPopoverProps = PropsWithChildren<{}>;

const HeaderExtendPopoverView = ({ children }: HeaderExtendPopoverProps) => {
  return (
    <Popover
      closeOnEnter
      closeOnEscape
      closeOnRemoteClick
      closeOnScroll
      className='!rounded-lg !p-0 !overflow-hidden'
      content={<div className='flex flex-col'>{children}</div>}
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

export const HeaderExtendPopover = memo(HeaderExtendPopoverView);
