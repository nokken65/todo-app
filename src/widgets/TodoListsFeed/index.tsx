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
import { AddTodoForm, addTodoModel } from '~/features/addTodo';
import { deleteTodoListModel } from '~/features/deleteTodoList';
import { filterTodoListModel } from '~/features/filterTodoList';
import {
  UpdateTodoListLabelForm,
  updateTodoListModel,
} from '~/features/updateTodoList';
import { Button } from '~/shared/components';
import { AddIcon, LoaderRingIcon } from '~/shared/icons';
import type { TodoList } from '~/shared/types';

type TodoListItemProps = {
  todoList: TodoList;
  openTodoListLabelForm: (id: string) => void;
  closeTodoListLabelForm: (id: string) => void;
  openAddTodoForm: (id: string) => void;
  closeAddTodoForm: (id: string) => void;
  deleteTodoList: (props: Pick<TodoList, 'id'>) => void;
};

const TodoListItemView = ({
  todoList,
  openTodoListLabelForm,
  closeTodoListLabelForm,
  openAddTodoForm,
  closeAddTodoForm,
  deleteTodoList,
}: TodoListItemProps) => {
  const todoListLabelFormIsOpen = useStoreMap({
    store: updateTodoListModel.labelFormState.$isOpen,
    keys: [todoList.id],
    fn: (state, [id]) => state[id],
  });
  const addTodoFormIsOpen = useStoreMap({
    store: addTodoModel.formState.$isOpen,
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
                onAction: () => openTodoListLabelForm(todoList.id),
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
        label={
          todoListLabelFormIsOpen ? (
            <UpdateTodoListLabelForm
              id={todoList.id}
              label={todoList.label}
              onBlur={() => closeTodoListLabelForm(todoList.id)}
            />
          ) : (
            <TodoListLabel label={todoList.label} />
          )
        }
      >
        <ul className='flex flex-col gap-2 mb-4'>
          {todoList.todos &&
            todoList.todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem {...todo} />
              </li>
            ))}
        </ul>
        <div className='flex w-full -mb-11'>
          {addTodoFormIsOpen ? (
            <AddTodoForm
              listId={todoList.id}
              onBlur={() => closeAddTodoForm(todoList.id)}
            />
          ) : (
            <Button
              className='w-10 h-10 ml-auto'
              onClick={() => openAddTodoForm(todoList.id)}
            >
              <AddIcon className='w-4 h-4' />
            </Button>
          )}
        </div>
      </TodoListCard>
    </li>
  );
};

const TodoListList = list({
  view: TodoListItemView,
  source: filterTodoListModel.selectors.$filteredTodoLists,
  bind: {
    deleteTodoList: deleteTodoListModel.events.deleteTodoList,
    openTodoListLabelForm: updateTodoListModel.labelFormState.open,
    closeTodoListLabelForm: updateTodoListModel.labelFormState.close,
    openAddTodoForm: addTodoModel.formState.open,
    closeAddTodoForm: addTodoModel.formState.close,
  },
  mapItem: {
    todoList: (_list) => _list,
  },
  getKey: ({ id }) => id,
});

const TodoListsWrapper = () => (
  <ul className='grid h-full grid-cols-2 gap-10 2xl:flex 2xl:flex-col'>
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
      todoListModel.effects.getTodoListsFx();
    },
  },
});

export const TodoListsFeed = () => {
  return <TodoListsFeedContent />;
};
