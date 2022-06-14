import {
  attach,
  createEffect,
  createEvent,
  createStore,
  forward,
} from 'effector';

import { dateModel } from '~/entities/Date';
import { AddListOfTodosInputs, listOfTodosModel } from '~/entities/ListOfTodos';
import { addListOfTodos } from '~/entities/ListOfTodos/api';
import type { TodoList } from '~/shared/types';

const addListOfTodosOriginalFx = createEffect<AddListOfTodosInputs, TodoList>(
  async ({ date, label }) => {
    const { data, error } = await addListOfTodos({ date, label });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Error while add new list of todos');
    }

    return data;
  },
);

const addListOfTodosFx = attach({
  effect: addListOfTodosOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: ({ label }, selectedDate) => ({
    date: selectedDate,
    label,
  }),
});

forward({
  from: addListOfTodosFx.doneData,
  to: listOfTodosModel.events.upsertListOfTodos,
});

const changeEditState = createEvent();

const $isEdit = createStore<boolean>(false)
  .on(changeEditState, (state) => !state)
  .on(addListOfTodosFx.doneData, () => false);

export const selectors = {
  $isEdit,
};

export const events = {
  changeEditState,
};

export const effects = {
  addListOfTodosFx,
};