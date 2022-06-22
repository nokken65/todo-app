import { memo } from 'react';

import { Heading } from '~/shared/components';

type TodoListLabelProps = {
  label: string;
};

const TodoListLabelView = ({ label }: TodoListLabelProps) => {
  return (
    <Heading capitalize={false} className='!break-words' type='h2'>
      {label}
    </Heading>
  );
};

export const TodoListLabel = memo(TodoListLabelView);
