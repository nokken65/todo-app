import { attach, createEffect, forward } from 'effector';

import { dateModel } from '~/entities/Date';
import {
  AddTodoListInputs,
  todoListApi,
  todoListModel,
} from '~/entities/TodoList';
import type { TodoList } from '~/shared/types';

const addTodoListOriginalFx = createEffect<AddTodoListInputs, TodoList>(
  async ({ date, label }) => {
    const { data, error } = await todoListApi.addTodoList({
      date,
      label,
    });

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Error while add new list of todos');
    }

    return data;
  },
);

const addTodoListFx = attach({
  effect: addTodoListOriginalFx,
  source: dateModel.selectors.$selectedDate,
  mapParams: ({ label }: Pick<TodoList, 'label'>, selectedDate) => ({
    date: selectedDate,
    label,
  }),
});

forward({
  from: addTodoListFx.doneData,
  to: todoListModel.events.upsertTodoList,
});

export const effects = {
  addTodoListFx,
};
