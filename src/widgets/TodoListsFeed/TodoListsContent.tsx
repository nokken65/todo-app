import { reflect } from '@effector/reflect';
import { useList, useStoreMap } from 'effector-react';

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

type TodoListsItemProps = {
  list: TodoList;
  openTodoListLabelForm: (id: string) => void;
  closeTodoListLabelForm: (id: string) => void;
  deleteTodoList: (props: Pick<TodoList, 'id'>) => void;
};

const TodoListsItemView = ({
  list,
  openTodoListLabelForm,
  closeTodoListLabelForm,
  deleteTodoList,
}: TodoListsItemProps) => {
  const isOpenLabelForm = useStoreMap({
    store: updateTodoListModel.labelFormState.$isOpen,
    keys: [list.id],
    fn: (state, [id]) => state[id],
  });

  return (
    <TodoListCard
      actions={
        <TodoListActionsPopover
          actions={[
            {
              name: 'editLabelList',
              content: 'Edit',
              onAction: () => openTodoListLabelForm(list.id),
            },
            {
              name: 'deleteList',
              content: 'Delete',
              className: 'text-red-500',
              onAction: () => deleteTodoList({ id: list.id }),
            },
          ]}
        />
      }
      label={
        isOpenLabelForm ? (
          <UpdateTodoListLabelForm
            id={list.id}
            label={list.label}
            onBlur={() => closeTodoListLabelForm(list.id)}
          />
        ) : (
          <TodoListLabel label={list.label} />
        )
      }
    >
      <TodosContent listId={list.id} />
      <AddTodo listId={list.id} />
    </TodoListCard>
  );
};

const TodoListsItem = reflect({
  view: TodoListsItemView,
  bind: {
    deleteTodoList: deleteTodoListModel.events.deleteTodoList,
    openTodoListLabelForm: updateTodoListModel.labelFormState.open,
    closeTodoListLabelForm: updateTodoListModel.labelFormState.close,
  },
});

const TodoListsContent = () => {
  const lists = useList(
    filterTodoListModel.selectors.$filteredTodoLists,
    (_list) => (
      <li className='mb-10 xl:mb-0'>
        <TodoListsItem list={_list} />
      </li>
    ),
  );

  return (
    <ul className='columns-three 3xl:columns-two xl:columns-one'>{lists}</ul>
  );
};

export { TodoListsContent };
