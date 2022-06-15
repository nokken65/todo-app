import { list, variant } from '@effector/reflect';
import { combine } from 'effector';

import {
  ListOfTodosActionsPopover,
  ListOfTodosCard,
  ListOfTodosLabel,
  listOfTodosModel,
} from '~/entities/ListOfTodos';
import { deleteListOfTodosModel } from '~/features/deleteListOfTodos';
import {
  UpdateLabelListOfTodosForm,
  updateListOfTodosModel,
} from '~/features/updateListOfTodos';
import { Typography } from '~/shared/components';
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
          <ListOfTodosLabel
            form={
              <UpdateLabelListOfTodosForm
                id={listOfTodos.id}
                label={listOfTodos.label}
              />
            }
            isEdit={listLabelBeingUpdated === listOfTodos.id}
            label={listOfTodos.label}
          />
        }
      >
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          dolor.
        </Typography>
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
    loading: () => <span>Loading...</span>,
    empty: () => <span>Empty :(</span>,
    ready: ListOfTodosList,
  },
  hooks: {
    mounted: listOfTodosModel.effects.getListsOfTodosFx.prepend(() => null),
  },
});

export const ListOfTodosFeed = () => {
  return (
    <ul className='flex flex-col gap-4'>
      <ListOfTodosFeedContent />
    </ul>
  );
};
