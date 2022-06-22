import { createEffect, createEvent, createStore, forward } from 'effector';
import produce from 'immer';

import {
  DeleteTodoListInputs,
  todoListApi,
  todoListModel,
} from '~/entities/TodoList';

const deleteTodoListFx = createEffect<
  DeleteTodoListInputs,
  DeleteTodoListInputs
>(async ({ id }) => {
  const { error } = await todoListApi.deleteTodoList({ id });

  if (error) {
    throw error;
  }

  return { id };
});

const deleteTodoList = createEvent<DeleteTodoListInputs>();

forward({
  from: deleteTodoList,
  to: deleteTodoListFx,
});

forward({
  from: deleteTodoListFx.doneData,
  to: todoListModel.events.deleteTodoList,
});

const $disabledListsId = createStore<Record<string, boolean>>({})
  .on(deleteTodoList, (state, { id }) =>
    produce(state, (draft) => {
      draft[id] = true;
    }),
  )
  .on(deleteTodoListFx.doneData, (state, { id }) =>
    produce(state, (draft) => {
      delete draft[id];
    }),
  );

export const selectors = { $disabledListsId };
export const events = { deleteTodoList };
