import { attach, createEffect, createEvent, createStore } from 'effector';
import { produce } from 'immer';

import { dateModel } from '~/entities/Date';
import type { TodoList } from '~/shared/types';

import { getTodoLists } from '../api';
import type { GetTodoListsInputs } from './model';

const getTodoListsOriginalFx = createEffect<GetTodoListsInputs, TodoList[]>(
  async ({ date, label }) => {
    const { data, error } = await getTodoLists({ date, label });

    if (error) {
      throw error;
    }

    return data ?? [];
  },
);

const getTodoListsFx = attach({
  effect: getTodoListsOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: (props: Omit<GetTodoListsInputs, 'date'>, date) => ({
    date,
    ...props,
  }),
});

const upsertTodoList = createEvent<TodoList>();
const updateTodoList = createEvent<TodoList>();
const deleteTodoList = createEvent<Pick<TodoList, 'id'>>();

const $todoLists = createStore<TodoList[]>([])
  .on(getTodoListsFx.doneData, (_, payload) => payload)
  .on(upsertTodoList, (state, payload) =>
    produce(state, (draft) => {
      draft.unshift(payload);
    }),
  )
  .on(updateTodoList, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      draft[index] = payload;
    }),
  )
  .on(deleteTodoList, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      draft.splice(index, 1);
    }),
  );

const $todoListsIsLoading = getTodoListsFx.pending;
const $todoListsIsEmpty = $todoLists.map((list) => list.length === 0);
const $todoListsCount = $todoLists.map((list) => list.length);

// error watcher
getTodoListsFx.fail.watch(console.error);

export const selectors = {
  $todoLists,
  $todoListsIsLoading,
  $todoListsIsEmpty,
  $todoListsCount,
};

export const events = {
  upsertTodoList,
  updateTodoList,
  deleteTodoList,
};

export const effects = {
  getTodoListsFx,
};
