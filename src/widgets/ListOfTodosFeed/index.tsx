import { list, variant } from '@effector/reflect';
import { combine } from 'effector';

import {
  HeaderExtendPopover,
  ListOfTodosCard,
  listOfTodosModel,
} from '~/entities/ListOfTodos';
import {
  DeleteListOfTodosButton,
  deleteListOfTodosModel,
} from '~/features/deleteListOfTodos';
import {
  UpdateLabelListOfTodosButton,
  UpdateLabelListOfTodosForm,
  updateListOfTodosModel,
} from '~/features/updateListOfTodos';
import { Heading, Typography } from '~/shared/components';
import type { TodoList } from '~/shared/types';

type ListOfTodosItemProps = {
  listOfTodos: TodoList;
  listLabelBeingUpdated: string | null;
  listsBeingDeleted: string[];
};

const ListOfTodosItemView = ({
  listOfTodos,
  listLabelBeingUpdated,
  listsBeingDeleted,
}: ListOfTodosItemProps) => {
  return (
    <li>
      <ListOfTodosCard
        headerExtend={
          <HeaderExtendPopover>
            <UpdateLabelListOfTodosButton id={listOfTodos.id} />
            <DeleteListOfTodosButton id={listOfTodos.id} />
          </HeaderExtendPopover>
        }
        isDisabled={listsBeingDeleted.includes(listOfTodos.id)}
        label={
          listLabelBeingUpdated === listOfTodos.id ? (
            <UpdateLabelListOfTodosForm
              id={listOfTodos.id}
              label={listOfTodos.label}
            />
          ) : (
            <Heading className='break-words' type='h2'>
              {listOfTodos.label}
            </Heading>
          )
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
