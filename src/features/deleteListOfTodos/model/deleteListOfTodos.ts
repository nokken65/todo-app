import { createEffect, createEvent, createStore, forward } from 'effector';

import {
  DeleteListOfTodosInputs,
  listOfTodosApi,
  listOfTodosModel,
} from '~/entities/ListOfTodos';

const deleteListOfTodosFx = createEffect<
  DeleteListOfTodosInputs,
  DeleteListOfTodosInputs
>(async ({ id }) => {
  const { error } = await listOfTodosApi.deleteListOfTodos({ id });

  if (error) {
    throw error;
  }

  return { id };
});

const deleteListOfTodos = createEvent<DeleteListOfTodosInputs>();

const $listsOfTodosBeingDeleted = createStore<string[]>([])
  .on(deleteListOfTodos, (state, payload) => [...state, payload.id])
  .on(deleteListOfTodosFx.doneData, (state, payload) =>
    state.filter((id) => payload.id !== id),
  );

forward({
  from: deleteListOfTodos,
  to: deleteListOfTodosFx,
});

forward({
  from: deleteListOfTodosFx.doneData,
  to: listOfTodosModel.events.deleteListOfTodos,
});

// watching errors
deleteListOfTodosFx.fail.watch(console.error);

export const selectors = {
  $listsOfTodosBeingDeleted,
};

export const events = {
  deleteListOfTodos,
};
