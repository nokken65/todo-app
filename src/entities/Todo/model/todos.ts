import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import produce from 'immer';

import { dateModel } from '~/entities/Date';
import type { DateString, Todo } from '~/shared/types';

import { getTodosByDate } from '../api';
import {
  AddManyTodosInputs,
  DeleteTodoInputs,
  GetTodosByDateInputs,
  UpdateTodoInputs,
} from './model';

const getTodosByDateOriginalFx = createEffect<
  GetTodosByDateInputs,
  { data: Todo[]; date: DateString }
>(async ({ date }) => {
  const { data, error } = await getTodosByDate({ date });

  if (error) {
    throw error;
  }

  return { data: data ?? [], date };
});

const getTodosByDateFx = attach({
  effect: getTodosByDateOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: (_: void, date) => ({
    date,
  }),
});

const $todosMapByDate = createStore<Record<DateString, Todo[]>>({}).on(
  getTodosByDateFx.doneData,
  (state, payload) =>
    produce(state, (draft) => {
      draft[payload.date] = payload.data;
    }),
);

const addManyTodos = createEvent<AddManyTodosInputs>();
const updateTodo = createEvent<UpdateTodoInputs>();
const deleteTodo = createEvent<DeleteTodoInputs>();

const $todos = createStore<Todo[]>([])
  .on(addManyTodos, (state, payload) =>
    produce(state, (draft) => {
      draft.push(...payload.todos);
    }),
  )
  .on(updateTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      if (index !== -1) draft[index] = { ...draft[index], ...payload.updates };
    }),
  )
  .on(deleteTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      if (index !== -1) draft.splice(index, 1);
    }),
  );

const $todosIsLoading = getTodosByDateFx.pending;
const $todosCount = $todos.map((todos) => todos.length);

sample({
  clock: [dateModel.selectors.$selectedDate, getTodosByDateFx.doneData],
  source: {
    date: dateModel.selectors.$selectedDate,
    todosMapByDate: $todosMapByDate,
  },
  target: $todos,
  filter: ({ todosMapByDate, date }) => Boolean(todosMapByDate[date]),
  fn: ({ date, todosMapByDate }) => todosMapByDate[date],
});

sample({
  clock: [addManyTodos, updateTodo, deleteTodo],
  source: {
    date: dateModel.selectors.$selectedDate,
    todos: $todos,
    todosMapByDate: $todosMapByDate,
  },
  target: $todosMapByDate,
  fn: ({ date, todos, todosMapByDate }) =>
    produce(todosMapByDate, (draft) => {
      draft[date] = todos;
    }),
});

// $todosMapByDate.watch(console.log);
// $todosMapByList.watch(console.log);

export const selectors = {
  $todosMapByDate,
  $todos,
  $todosIsLoading,
  $todosCount,
};

export const events = {
  addManyTodos,
  updateTodo,
  deleteTodo,
};

export const effects = {
  getTodosByDateFx,
};
