import { PropsWithChildren, ReactNode } from 'react';

import { Card } from '~/shared/components';

type ListOfTodosProps = PropsWithChildren<{
  label?: ReactNode;
  headerExtend?: ReactNode;
  isDisabled?: boolean;
}>;

export const ListOfTodosCard = ({
  label,
  headerExtend,
  isDisabled,
  children,
}: ListOfTodosProps) => {
  return (
    <Card className={isDisabled && 'pointer-events-none blur-sm'}>
      <div className='flex items-start justify-between gap-2'>
        {label}
        {headerExtend}
      </div>
      {children}
    </Card>
  );
};
