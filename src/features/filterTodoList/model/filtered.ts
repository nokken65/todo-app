import { createStore, sample } from 'effector';

import { todoListModel } from '~/entities/TodoList';
import { TodoList } from '~/shared/types';

import { searchFilter } from './searchFilter';

const $filteredTodoLists = createStore<TodoList[]>([]);

const $filteredTodoListsCount = $filteredTodoLists.map((lists) => lists.length);

sample({
  clock: [todoListModel.selectors.$todoLists, searchFilter.$searchQuery],
  source: {
    todoLists: todoListModel.selectors.$todoLists,
    searchFilterQuery: searchFilter.$searchQuery,
  },
  target: $filteredTodoLists,
  fn: ({ todoLists, searchFilterQuery }) => {
    return todoLists.filter((list) =>
      list.label.toLowerCase().includes(searchFilterQuery.label.toLowerCase()),
    );
  },
});

export const selectors = { $filteredTodoLists, $filteredTodoListsCount };
