import { variant } from '@effector/reflect';
import { combine } from 'effector';

import { todoModel } from '~/entities/Todo';
import { todoListModel, TodoListsEmpty } from '~/entities/TodoList';
import { LoaderRingIcon } from '~/shared/icons';

import { TodoListsContent } from './TodoListsContent';

const TodoListsFeedContent = variant({
  source: combine(
    {
      isLoading: todoListModel.selectors.$todoListsIsLoading,
      isEmpty: todoListModel.selectors.$todoListsIsEmpty,
    },
    ({ isLoading, isEmpty }) => {
      if (isLoading) return 'loading';
      if (isEmpty) return 'empty';

      return 'ready';
    },
  ),
  cases: {
    loading: () => (
      <div className='flex items-center justify-center w-full h-full grow'>
        <LoaderRingIcon className='w-20 h-20 animate-spin-fast' />
      </div>
    ),
    empty: () => <TodoListsEmpty />,
    ready: TodoListsContent,
  },
  hooks: {
    mounted: () => {
      todoListModel.effects.getTodoListsByDateFx();
      todoModel.effects.getTodosByDateFx();
    },
  },
});

export const TodoListsFeed = () => {
  return <TodoListsFeedContent />;
};
