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

const $todosMapByList = createStore<Record<string, Todo[]>>({})
  .on(addManyTodos, (state, payload) =>
    produce(state, (draft) => {
      draft[payload.listId] = [
        ...(draft[payload.listId] ?? []),
        ...payload.todos,
      ];
    }),
  )
  .on(updateTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft[payload.listId].findIndex(
        ({ id }) => id === payload.id,
      );
      draft[payload.listId][index] = {
        ...draft[payload.listId][index],
        ...payload.updates,
      };
    }),
  )
  .on(deleteTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft[payload.listId].findIndex(
        ({ id }) => id === payload.id,
      );
      draft[payload.listId].splice(index, 1);
    }),
  );

const $todosIsLoading = getTodosByDateFx.pending;
const $todosCount = $todosMapByList.map((todosMap) =>
  Object.keys(todosMap).reduce((count, key) => count + todosMap[key].length, 0),
);

sample({
  clock: [dateModel.selectors.$selectedDate, getTodosByDateFx.doneData],
  source: {
    date: dateModel.selectors.$selectedDate,
    todosMapByDate: $todosMapByDate,
    // todosMapByList: $todosMapByList,
  },
  target: $todosMapByList,
  filter: ({ todosMapByDate, date }) => Boolean(todosMapByDate[date]),
  fn: ({ date, todosMapByDate }) => {
    const arr: Record<string, Todo[]> = {};
    todosMapByDate[date].forEach((todo) => {
      arr[todo.listId] = [...(arr[todo.listId] ?? []), todo];
    });

    return arr;
  },
});

sample({
  clock: [addManyTodos, updateTodo, deleteTodo],
  source: {
    date: dateModel.selectors.$selectedDate,
    todosMapByList: $todosMapByList,
    todosMapByDate: $todosMapByDate,
  },
  target: $todosMapByDate,
  fn: ({ date, todosMapByList, todosMapByDate }) =>
    produce(todosMapByDate, (draft) => {
      const arr: Todo[] = [];

      Object.keys(todosMapByList).forEach((key) => {
        todosMapByList[key].forEach((todo) => {
          arr.push(todo);
        });
      });

      draft[date] = arr;
    }),
});

// $todosMapByDate.watch(console.log);
// $todosMapByList.watch(console.log);

export const selectors = {
  $todosMapByDate,
  $todosMapByList,
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
