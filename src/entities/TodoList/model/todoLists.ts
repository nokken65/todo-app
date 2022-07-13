import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { produce } from 'immer';

import { dateModel } from '~/entities/Date';
import type { DateString, TodoList } from '~/shared/types';

import { getTodoListsByDate } from '../api';
import type {
  AddTodoListInputs,
  DeleteTodoListInputs,
  GetTodoListsByDateInputs,
  UpdateTodoListInputs,
} from './model';

const getTodoListsByDateOriginalFx = createEffect<
  GetTodoListsByDateInputs,
  { data: TodoList[]; date: DateString }
>(async ({ date }) => {
  const { data, error } = await getTodoListsByDate({ date });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('Cannot find todo lists');
  }

  return { data, date };
});

const getTodoListsByDateFx = attach({
  effect: getTodoListsByDateOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: (_: void, date) => ({
    date,
  }),
});

const $todoListsMap = createStore<Record<DateString, TodoList[]>>({}).on(
  getTodoListsByDateFx.doneData,
  (state, payload) =>
    produce(state, (draft) => {
      draft[payload.date] = payload.data;
    }),
);

const addTodoList = createEvent<AddTodoListInputs>();
const updateTodoList = createEvent<UpdateTodoListInputs>();
const deleteTodoList = createEvent<DeleteTodoListInputs>();

const $todoLists = createStore<TodoList[]>([])
  .on(addTodoList, (state, payload) =>
    produce(state, (draft) => {
      draft.unshift({ ...payload });
    }),
  )
  .on(updateTodoList, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      if (index !== -1) draft[index] = { ...draft[index], ...payload.updates };
    }),
  )
  .on(deleteTodoList, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      if (index !== -1) draft.splice(index, 1);
    }),
  );

const $todoListsIsLoading = getTodoListsByDateFx.pending;
const $todoListsIsEmpty = $todoLists.map((list) => list.length === 0);
const $todoListsCount = $todoLists.map((list) => list.length);

sample({
  clock: [dateModel.selectors.$selectedDate, getTodoListsByDateFx.doneData],
  source: {
    todoListsMap: $todoListsMap,
    selectedDate: dateModel.selectors.$selectedDate,
  },
  target: $todoLists,
  filter: ({ todoListsMap, selectedDate }) =>
    Boolean(todoListsMap[selectedDate]),
  fn: ({ todoListsMap, selectedDate }) => todoListsMap[selectedDate],
});

sample({
  clock: [addTodoList, deleteTodoList, updateTodoList],
  source: {
    todoListsMap: $todoListsMap,
    todoLists: $todoLists,
    date: dateModel.selectors.$selectedDate,
  },
  target: $todoListsMap,
  fn: ({ todoListsMap, todoLists, date }) =>
    produce(todoListsMap, (draft) => {
      draft[date] = todoLists;
    }),
});

// $todoListsMap.watch((state) => {
//   console.log('listsMap ---- ', state);
// });
// $todoLists.watch((state) => {
//   console.log('lists ---- ', state);
// });

export const selectors = {
  $todoLists,
  $todoListsMap,
  $todoListsIsLoading,
  $todoListsIsEmpty,
  $todoListsCount,
};

export const events = {
  addTodoList,
  updateTodoList,
  deleteTodoList,
};

export const effects = {
  getTodoListsByDateFx,
};
