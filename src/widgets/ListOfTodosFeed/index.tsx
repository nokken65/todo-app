import { list, variant } from '@effector/reflect';
import { combine } from 'effector';

import {
  ListOfTodosActionsPopover,
  ListOfTodosCard,
  ListOfTodosEmpty,
  ListOfTodosLabel,
  listOfTodosModel,
} from '~/entities/ListOfTodos';
import { TodoItem } from '~/entities/Todo';
import { deleteListOfTodosModel } from '~/features/deleteListOfTodos';
import {
  UpdateLabelListOfTodosForm,
  updateListOfTodosModel,
} from '~/features/updateListOfTodos';
import { LoaderRingIcon } from '~/shared/icons';
import type { TodoList } from '~/shared/types';

type ListOfTodosItemProps = {
  listOfTodos: TodoList;
  listLabelBeingUpdated: string | null;
  listsBeingDeleted: string[];
  onEditListLabel: (props: Pick<TodoList, 'id'>) => void;
  onDeleteList: (props: Pick<TodoList, 'id'>) => void;
};

const ListOfTodosItemView = ({
  listOfTodos,
  listLabelBeingUpdated,
  listsBeingDeleted,
  onEditListLabel,
  onDeleteList,
}: ListOfTodosItemProps) => {
  return (
    <li>
      <ListOfTodosCard
        headerExtend={
          <ListOfTodosActionsPopover
            actions={[
              {
                name: 'editLabelList',
                content: 'Edit',
                onAction: () => onEditListLabel({ id: listOfTodos.id }),
              },
              {
                name: 'deleteList',
                content: 'Delete',
                className: 'text-red-500',
                onAction: () => onDeleteList({ id: listOfTodos.id }),
              },
            ]}
          />
        }
        isDisabled={listsBeingDeleted.includes(listOfTodos.id)}
        label={
          listLabelBeingUpdated === listOfTodos.id ? (
            <UpdateLabelListOfTodosForm
              id={listOfTodos.id}
              label={listOfTodos.label}
            />
          ) : (
            <ListOfTodosLabel label={listOfTodos.label} />
          )
        }
      >
        <ul className='flex flex-col gap-2'>
          {listOfTodos.todos &&
            listOfTodos.todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem {...todo} />
              </li>
            ))}
        </ul>
      </ListOfTodosCard>
    </li>
  );
};

const ListOfTodosList = list({
  view: ListOfTodosItemView,
  source: listOfTodosModel.selectors.$listsOfTodos,
  bind: {
    listsBeingDeleted:
      deleteListOfTodosModel.selectors.$listsOfTodosBeingDeleted,
    listLabelBeingUpdated:
      updateListOfTodosModel.selectors.$listOfTodosBeingUpdated,
    onEditListLabel: updateListOfTodosModel.events.setListOfTodosBeingUpdated,
    onDeleteList: deleteListOfTodosModel.events.deleteListOfTodos,
  },
  mapItem: {
    listOfTodos: (_list) => _list,
  },
  getKey: ({ id }) => id,
});

const ListOfTodosWrapper = () => (
  <ul className='grid h-full grid-cols-2 gap-4 2xl:flex 2xl:flex-col'>
    <ListOfTodosList />
  </ul>
);

const ListOfTodosFeedContent = variant({
  source: combine(
    {
      isLoading: listOfTodosModel.selectors.$listsOfTodosIsLoading,
      isEmpty: listOfTodosModel.selectors.$listsOfTodosIsEmpty,
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
    empty: () => <ListOfTodosEmpty />,
    ready: ListOfTodosWrapper,
  },
  hooks: {
    mounted: listOfTodosModel.effects.getListsOfTodosFx.prepend(() => ({})),
  },
});

export const ListOfTodosFeed = () => {
  return <ListOfTodosFeedContent />;
};
