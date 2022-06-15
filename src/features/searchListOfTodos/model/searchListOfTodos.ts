import { attach, createEvent, createStore } from 'effector';

import { dateModel } from '~/entities/Date';
import { listOfTodosModel } from '~/entities/ListOfTodos';
import { TodoList } from '~/shared/types';

const searchListOfTodosFx = attach({
  effect: listOfTodosModel.effects.getListsOfTodosFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: ({ label }: Pick<TodoList, 'label'>, selectedDate) => ({
    date: selectedDate,
    filterByLabel: label,
  }),
});

const changeSearchState = createEvent();

const $isSearch = createStore<boolean>(false).on(
  changeSearchState,
  (state) => !state,
);

export const selectors = {
  $isSearch,
};

export const events = {
  changeSearchState,
};

export const effects = {
  searchListOfTodosFx,
};
