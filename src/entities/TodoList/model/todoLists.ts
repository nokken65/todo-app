import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { produce } from 'immer';

import { dateModel } from '~/entities/Date';
import {
  AddManyTodoInputs,
  AddOneTodoInputs,
  DeleteTodoInputs,
  UpdateTodoInputs,
} from '~/entities/Todo';
import type { DateString, TodoList } from '~/shared/types';

import { getTodoLists } from '../api';
import type {
  AddTodoListInputs,
  DeleteTodoListInputs,
  GetTodoListsInputs,
  UpdateTodoListInputs,
} from './model';

const getTodoListsOriginalFx = createEffect<
  GetTodoListsInputs,
  { data: TodoList[]; date: DateString }
>(async ({ date }) => {
  const { data, error } = await getTodoLists({ date });

  if (error) {
    throw error;
  }

  return { data: data ?? [], date };
});

const getTodoListsFx = attach({
  effect: getTodoListsOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: (_: void, date) => ({
    date,
  }),
});

const $todoListsMap = createStore<Record<DateString, TodoList[]>>({}).on(
  getTodoListsFx.doneData,
  (state, payload) =>
    produce(state, (draft) => {
      draft[payload.date] = payload.data;
    }),
);

const addOneTodo = createEvent<AddOneTodoInputs>();
const addManyTodo = createEvent<AddManyTodoInputs>();
const updateTodo = createEvent<UpdateTodoInputs>();
const deleteTodo = createEvent<DeleteTodoInputs>();
const upsertTodoList = createEvent<AddTodoListInputs>();
const updateTodoList = createEvent<UpdateTodoListInputs>();
const deleteTodoList = createEvent<DeleteTodoListInputs>();

const $todoLists = createStore<TodoList[]>([])
  .on(upsertTodoList, (state, payload) =>
    produce(state, (draft) => {
      draft.unshift({ ...payload, todos: [] });
    }),
  )
  .on(deleteTodoList, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.id);
      draft.splice(index, 1);
    }),
  )
  .on(updateTodoList, (state, payload) =>
    produce(state, (draft) => {
      const updates = Object.keys(payload)
        .filter((k) => payload[k] !== undefined)
        .reduce((a, k) => ({ ...a, [k]: payload[k] }), {});

      const index = draft.findIndex(({ id }) => id === payload.id);
      draft[index] = { ...draft[index], ...updates };
    }),
  )
  .on(addOneTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload.listId);
      draft[index].todos.push(payload);
    }),
  )
  .on(addManyTodo, (state, payload) =>
    produce(state, (draft) => {
      const index = draft.findIndex(({ id }) => id === payload[0].listId);
      draft[index].todos.push(...payload);
    }),
  );
// .on(deleteTodo, (state, payload) =>
//   produce(state, (draft) => {
//     const listIndex = draft.findIndex(({ id }) => id === payload.listId);
//     const todoIndex = draft[listIndex].todos.findIndex(
//       ({ id }) => id === payload.id,
//     );
//     draft[listIndex].todos.splice(todoIndex, 1);
//   }),
// )
// .on(updateTodo, (state, payload) =>
//   produce(state, (draft) => {
//     const listIndex = draft.findIndex(({ id }) => id === payload.listId);
//     const todoIndex = draft[listIndex].todos.findIndex(
//       ({ id }) => id === payload.todo.id,
//     );
//     draft[listIndex].todos[todoIndex] = payload.todo;
//   }),
// );

const $todoListsIsLoading = getTodoListsFx.pending;
const $todoListsIsEmpty = $todoLists.map((list) => list.length === 0);
const $todoListsCount = $todoLists.map((list) => list.length);

sample({
  clock: [dateModel.selectors.$selectedDate, getTodoListsFx.doneData],
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
  clock: [
    addOneTodo,
    addManyTodo,
    deleteTodo,
    updateTodo,
    upsertTodoList,
    deleteTodoList,
    updateTodoList,
  ],
  source: {
    todoListsMap: $todoListsMap,
    todoLists: $todoLists,
    date: dateModel.selectors.$selectedDate,
  },
  target: $todoListsMap,
  fn: ({ todoListsMap, todoLists, date }) => {
    return produce(todoListsMap, (draft) => {
      draft[date] = todoLists;
    });
  },
});

// error watcher
getTodoListsFx.fail.watch(console.error);

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
  upsertTodoList,
  updateTodoList,
  deleteTodoList,
  addOneTodo,
  addManyTodo,
  updateTodo,
  deleteTodo,
};

export const effects = {
  getTodoListsFx,
};
