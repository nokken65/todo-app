import { attach, createEvent, createStore, sample } from 'effector';

import { dateModel } from '~/entities/Date';
import { todoListModel } from '~/entities/TodoList';
import { TodoList } from '~/shared/types';

const searchTodoListFx = attach({
  effect: todoListModel.effects.getTodoListsFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: ({ label }: Pick<TodoList, 'label'>, date) => ({
    date,
    label,
  }),
});

const resetSearchQuery = createEvent();

const $searchQuery = createStore<Pick<TodoList, 'label'>>({
  label: new URLSearchParams(window.location.search).get('q') ?? '',
});

sample({
  clock: searchTodoListFx.doneData,
  target: $searchQuery,
  fn: () => ({
    label: new URLSearchParams(window.location.search).get('q') ?? '',
  }),
});

sample({
  clock: resetSearchQuery,
  target: [todoListModel.effects.getTodoListsFx, $searchQuery],
  fn: () => {
    window.history.pushState({}, document.title, window.location.pathname);

    return { label: '' };
  },
});

export const selectors = {
  $searchQuery,
};

export const events = {
  resetSearchQuery,
};

export const effects = {
  searchTodoListFx,
};
