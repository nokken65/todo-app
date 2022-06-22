import { list, variant } from '@effector/reflect';
import { combine } from 'effector';
import { useStoreMap } from 'effector-react';

import { TodoItem } from '~/entities/Todo';
import {
  TodoListActionsPopover,
  TodoListCard,
  TodoListLabel,
  todoListModel,
  TodoListsEmpty,
} from '~/entities/TodoList';
import { deleteTodoListModel } from '~/features/deleteTodoList';
import {
  UpdateTodoListLabelForm,
  updateTodoListModel,
} from '~/features/updateTodoList';
import { LoaderRingIcon } from '~/shared/icons';
import type { TodoList } from '~/shared/types';

type TodoListItemProps = {
  todoList: TodoList;
  openLabelForm: (id: string) => void;
  closeLabelForm: (id: string) => void;
  deleteTodoList: (props: Pick<TodoList, 'id'>) => void;
};

const TodoListItemView = ({
  todoList,
  openLabelForm,
  closeLabelForm,
  deleteTodoList,
}: TodoListItemProps) => {
  const labelFormIsOpen = useStoreMap({
    store: updateTodoListModel.labelFormState.$isOpen,
    keys: [todoList.id],
    fn: (state, [id]) => state[id],
  });
  const isDisabled = useStoreMap({
    store: deleteTodoListModel.selectors.$disabledListsId,
    keys: [todoList.id],
    fn: (state, [id]) => state[id],
  });

  return (
    <li>
      <TodoListCard
        actions={
          <TodoListActionsPopover
            actions={[
              {
                name: 'editLabelList',
                content: 'Edit',
                onAction: () => openLabelForm(todoList.id),
              },
              {
                name: 'deleteList',
                content: 'Delete',
                className: 'text-red-500',
                onAction: () => deleteTodoList({ id: todoList.id }),
              },
            ]}
          />
        }
        isDisabled={isDisabled}
        label={
          labelFormIsOpen ? (
            <UpdateTodoListLabelForm
              id={todoList.id}
              label={todoList.label}
              onBlur={() => closeLabelForm(todoList.id)}
            />
          ) : (
            <TodoListLabel label={todoList.label} />
          )
        }
      >
        <ul className='flex flex-col gap-2'>
          {todoList.todos &&
            todoList.todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem {...todo} />
              </li>
            ))}
        </ul>
      </TodoListCard>
    </li>
  );
};

const TodoListList = list({
  view: TodoListItemView,
  source: todoListModel.selectors.$todoLists,
  bind: {
    deleteTodoList: deleteTodoListModel.events.deleteTodoList,
    openLabelForm: updateTodoListModel.labelFormState.open,
    closeLabelForm: updateTodoListModel.labelFormState.close,
  },
  mapItem: {
    todoList: (_list) => _list,
  },
  getKey: ({ id }) => id,
});

const TodoListsWrapper = () => (
  <ul className='grid h-full grid-cols-2 gap-4 2xl:flex 2xl:flex-col'>
    <TodoListList />
  </ul>
);

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
    ready: TodoListsWrapper,
  },
  hooks: {
    mounted: () => {
      todoListModel.effects.getTodoListsFx({});
    },
  },
});

export const TodoListsFeed = () => {
  return <TodoListsFeedContent />;
};
