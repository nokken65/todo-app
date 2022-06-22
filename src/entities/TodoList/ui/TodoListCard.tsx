import clsx from 'clsx';
import { memo, PropsWithChildren, ReactNode } from 'react';

import { Card } from '~/shared/components';

type TodoListProps = PropsWithChildren<{
  label?: ReactNode;
  actions?: ReactNode;
  isDisabled?: boolean;
}>;

const TodoListCardView = ({
  label,
  actions,
  isDisabled,
  children,
}: TodoListProps) => {
  return (
    <Card className={clsx(isDisabled && 'pointer-events-none blur-sm')}>
      <div className='flex items-center justify-between gap-2'>
        {label}
        {actions}
      </div>
      {children}
    </Card>
  );
};

export const TodoListCard = memo(TodoListCardView);
