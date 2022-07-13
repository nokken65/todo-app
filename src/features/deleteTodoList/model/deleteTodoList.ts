import { createEffect, createEvent, forward } from 'effector';

import { todoModel } from '~/entities/Todo';
import {
  DeleteTodoListInputs,
  todoListApi,
  todoListModel,
} from '~/entities/TodoList';

const deleteTodoListFx = createEffect<
  DeleteTodoListInputs,
  DeleteTodoListInputs
>(async ({ id }) => {
  const { error } = await todoListApi.deleteTodoList({ id });

  if (error) {
    throw error;
  }

  return { id };
});

const deleteTodoList = createEvent<DeleteTodoListInputs>();

forward({
  from: deleteTodoList,
  to: [todoListModel.events.deleteTodoList, deleteTodoListFx],
});

forward({
  from: deleteTodoList,
  to: todoModel.effects.getTodosByDateFx,
});

export const events = { deleteTodoList };
