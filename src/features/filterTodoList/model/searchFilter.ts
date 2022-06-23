import { createEvent, createStore } from 'effector';
import produce from 'immer';

import { TodoList } from '~/shared/types';

const searchTodoList = createEvent<Pick<TodoList, 'label'>>();
const resetSearchFilter = createEvent();

const $searchQuery = createStore<Pick<TodoList, 'label'>>({
  label: new URLSearchParams(window.location.search).get('q') ?? '',
})
  .on(searchTodoList, (state, payload) =>
    produce(state, (draft) => {
      draft.label = payload.label;
    }),
  )
  .on(resetSearchFilter, () => ({ label: '' }));

export const searchFilter = {
  $searchQuery,
  searchTodoList,
  resetSearchFilter,
};
