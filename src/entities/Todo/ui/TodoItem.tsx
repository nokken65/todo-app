import { memo } from 'react';

import { CheckboxField } from '~/shared/components';
import { Todo } from '~/shared/types';

type TodoItemProps = Pick<Todo, 'text' | 'isComplete'> & {
  onComplete: () => void;
};

const TodoItemView = ({ text, isComplete, onComplete }: TodoItemProps) => {
  return (
    <CheckboxField
      checked={isComplete}
      className='pt-2 pb-2'
      label={text}
      onChange={onComplete}
    />
  );
};

export const TodoItem = memo(TodoItemView);
