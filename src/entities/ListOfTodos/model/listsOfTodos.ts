import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';

import { dateModel } from '~/entities/Date';
import type { TodoList } from '~/shared/types';

import { getListsOfTodos } from '../api';
import { GetListOfTodosInputs } from './model';

const getListsOfTodosOriginalFx = createEffect<
  GetListOfTodosInputs,
  TodoList[]
>(async ({ date }) => {
  const { data, error } = await getListsOfTodos({ date });

  if (error) {
    throw error;
  }

  return data ?? [];
});

const getListsOfTodosFx = attach({
  effect: getListsOfTodosOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: (_, selectedDate) => ({
    date: selectedDate,
  }),
});

forward({
  from: dateModel.selectors.$selectedDate,
  to: getListsOfTodosFx,
});

const upsertListOfTodos = createEvent<TodoList>();
const updateListOfTodos = createEvent<TodoList>();
const deleteListOfTodos = createEvent<Pick<TodoList, 'id'>>();

const $listsOfTodos = createStore<TodoList[]>([])
  .on(getListsOfTodosFx.doneData, (_, payload) => payload)
  .on(upsertListOfTodos, (state, payload) => [payload, ...state])
  .on(updateListOfTodos, (state, payload) =>
    state.map((list) => (list.id === payload.id ? payload : list)),
  )
  .on(deleteListOfTodos, (state, payload) =>
    state.filter((list) => list.id !== payload.id),
  );

const $listsOfTodosIsLoading = getListsOfTodosFx.pending;
const $listsOfTodosIsEmpty = $listsOfTodos.map((list) => list.length === 0);

// error watcher
getListsOfTodosFx.fail.watch(console.error);

export const selectors = {
  $listsOfTodos,
  $listsOfTodosIsLoading,
  $listsOfTodosIsEmpty,
};

export const events = {
  upsertListOfTodos,
  updateListOfTodos,
  deleteListOfTodos,
};

export const effects = {
  getListsOfTodosFx,
};