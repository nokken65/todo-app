import { createEffect, createEvent, createStore, forward } from 'effector';

import {
  listOfTodosApi,
  listOfTodosModel,
  UpdateListOfTodosInputs,
} from '~/entities/ListOfTodos';
import { NullableOptional, TodoList } from '~/shared/types';

const updateLabelListOfTodosFx = createEffect<
  UpdateListOfTodosInputs,
  TodoList
>(async ({ id, label }) => {
  const { data, error } = await listOfTodosApi.updateListOfTodos({ id, label });

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('Error while updating list of todos');
  }

  return data;
});

const updateLabelListOfTodos = createEvent<UpdateListOfTodosInputs>();
const setListOfTodosBeingUpdated =
  createEvent<NullableOptional<Pick<UpdateListOfTodosInputs, 'id'>>>();

const $listOfTodosBeingUpdated = createStore<string | null>(null)
  .on(setListOfTodosBeingUpdated, (_, payload) => (payload ? payload.id : null))
  .on(updateLabelListOfTodosFx.doneData, () => null);

forward({
  from: updateLabelListOfTodos,
  to: updateLabelListOfTodosFx,
});

forward({
  from: updateLabelListOfTodosFx.doneData,
  to: listOfTodosModel.events.updateListOfTodos,
});

// watching errors
updateLabelListOfTodosFx.fail.watch(console.error);

export const selectors = {
  $listOfTodosBeingUpdated,
};

export const events = {
  updateLabelListOfTodos,
  setListOfTodosBeingUpdated,
};
