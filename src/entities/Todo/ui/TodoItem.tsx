import clsx from 'clsx';
import { memo } from 'react';

import { Button, Typography } from '~/shared/components';
import { CheckIcon } from '~/shared/icons';
import { Todo } from '~/shared/types';

import { updateTodo } from '../api';

type TodoItemProps = Todo;

const TodoItemView = ({ id, text, isComplete }: TodoItemProps) => {
  return (
    <Button
      className='hover:bg-transparent'
      type='ghost'
      onClick={() => updateTodo({ id, text, isComplete: !isComplete })}
    >
      <span
        className={clsx(
          'w-5 h-5 border-2 flex justify-center items-center border-gray-500 rounded-full',
          isComplete && '!border-violet-500 text-white bg-violet-500',
        )}
      >
        {isComplete && <CheckIcon className='w-3 h-3' />}
      </span>
      <Typography bold={false} className={clsx(isComplete && 'line-through')}>
        {text}
      </Typography>
    </Button>
  );
};

export const TodoItem = memo(TodoItemView);
