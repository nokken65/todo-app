import { list } from '@effector/reflect';
import { useStoreMap } from 'effector-react';

import { TodoItem } from '~/entities/Todo';
import {
  TodoListActionsPopover,
  TodoListCard,
  TodoListLabel,
} from '~/entities/TodoList';
import { AddTodoForm, addTodoModel } from '~/features/addTodo';
import { deleteTodoListModel } from '~/features/deleteTodoList';
import { filterTodoListModel } from '~/features/filterTodoList';
import { updateTodoModel } from '~/features/updateTodo';
import {
  UpdateTodoListLabelForm,
  updateTodoListModel,
} from '~/features/updateTodoList';
import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';
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
        <ul className='flex flex-col mb-4'>
          {todoList.todos &&
            todoList.todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  isComplete={todo.isComplete}
                  text={todo.text}
                  onComplete={() =>
                    updateTodoModel.events.updateTodoCompletion({
                      id: todo.id,
                      listId: todo.listId,
                      isComplete: !todo.isComplete,
                    })
                  }
                />
              </li>
            ))}
        </ul>
        <div className='flex w-full mt-auto -mb-11'>
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

const TodoListsContent = () => (
  <ul className='grid h-full grid-cols-3 3xl:grid-cols-2 gap-10 xl:flex xl:flex-col'>
    <TodoListList />
  </ul>
);

export { TodoListsContent };
