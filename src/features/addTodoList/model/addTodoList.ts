import { createEffect, createEvent, sample } from 'effector';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

import { dateModel } from '~/entities/Date';
import { todoModel } from '~/entities/Todo';
import {
  AddTodoListInputs,
  todoListApi,
  todoListModel,
} from '~/entities/TodoList';
import { userModel } from '~/entities/User';
import type { TodoList } from '~/shared/types';
import { dateToTimestamptz } from '~/shared/utils';

const addTodoListFx = createEffect<AddTodoListInputs, TodoList>(
  async (todoList) => {
    const { data, error } = await todoListApi.addTodoList(todoList);

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error('Error while add new list of todos');
    }

    return data;
  },
);

const addTodoListData = createEvent<AddTodoListInputs>();

const addTodoList = createEvent<Pick<AddTodoListInputs, 'label'>>();

todoListModel.selectors.$todoLists.on(addTodoListData, (state, payload) =>
  produce(state, (draft) => {
    draft.unshift({ ...payload });
  }),
);

sample({
  clock: addTodoList,
  source: {
    date: dateModel.selectors.$selectedDate,
    userId: userModel.selectors.$userId,
  },
  target: [addTodoListData, addTodoListFx, todoModel.effects.getTodosByDateFx],
  fn: ({ date, userId }, { label }) => {
    const createdAt = dateToTimestamptz(new Date());
    const todoList: AddTodoListInputs = {
      date,
      label,
      id: uuidv4(),
      userId: userId ?? '',
      createdAt,
      updatedAt: createdAt,
    };

    return todoList;
  },
});

export const events = {
  addTodoList,
};
