import { list } from '@effector/reflect';
import { useStoreMap } from 'effector-react';

import {
  TodoListActionsPopover,
  TodoListCard,
  TodoListLabel,
} from '~/entities/TodoList';
import { AddTodo } from '~/features/addTodo';
import { deleteTodoListModel } from '~/features/deleteTodoList';
import { filterTodoListModel } from '~/features/filterTodoList';
import {
  UpdateTodoListLabelForm,
  updateTodoListModel,
} from '~/features/updateTodoList';
import type { TodoList } from '~/shared/types';

import { TodosContent } from './TodosContent';

type TodoListItemProps = {
  todoList: TodoList;
  openTodoListLabelForm: (id: string) => void;
  closeTodoListLabelForm: (id: string) => void;
  deleteTodoList: (props: Pick<TodoList, 'id'>) => void;
};

const TodoListItemView = ({
  todoList,
  openTodoListLabelForm,
  closeTodoListLabelForm,
  deleteTodoList,
}: TodoListItemProps) => {
  const todoListLabelFormIsOpen = useStoreMap({
    store: updateTodoListModel.labelFormState.$isOpen,
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
        <TodosContent listId={todoList.id} />
        <AddTodo listId={todoList.id} />
      </TodoListCard>
    </li>
  );
};

const TodoListsList = list({
  view: TodoListItemView,
  source: filterTodoListModel.selectors.$filteredTodoLists,
  bind: {
    deleteTodoList: deleteTodoListModel.events.deleteTodoList,
    openTodoListLabelForm: updateTodoListModel.labelFormState.open,
    closeTodoListLabelForm: updateTodoListModel.labelFormState.close,
  },
  mapItem: {
    todoList: (_list) => _list,
  },
  getKey: ({ id }) => id,
});

const TodoListsContent = () => (
  <ul className='grid h-full grid-cols-3 3xl:grid-cols-2 gap-10 xl:flex xl:flex-col'>
    <TodoListsList />
  </ul>
);

export { TodoListsContent };
