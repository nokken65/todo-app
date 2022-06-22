import { createEffect, forward } from 'effector';

import {
  todoListApi,
  todoListModel,
  UpdateTodoListInputs,
} from '~/entities/TodoList';
import { TodoList } from '~/shared/types';

const updateTodoListLabelFx = createEffect<
  Pick<UpdateTodoListInputs, 'id' | 'label'>,
  TodoList
>(async ({ id, label }) => {
  const { data, error } = await todoListApi.updateTodoList({
    id,
    label,
  });

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('Error while updating list of todos');
  }

  return data;
});

forward({
  from: updateTodoListLabelFx.doneData,
  to: todoListModel.events.updateTodoList,
});

export const effects = { updateTodoListLabelFx };
