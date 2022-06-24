import { createEffect, createEvent, sample } from 'effector';
import { v4 as uuidv4 } from 'uuid';

import { AddManyTodoInputs, todoApi } from '~/entities/Todo';
import { todoListModel } from '~/entities/TodoList';
import { userModel } from '~/entities/User';
import type { Todo } from '~/shared/types';
import { dateToTimestamptz } from '~/shared/utils';

const addTodoFx = createEffect<AddManyTodoInputs, Todo[]>(async (todos) => {
  const { data, error } = await todoApi.addManyTodo(todos);

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('Error while add new list of todos');
  }

  return data;
});

const addTodo = createEvent<{
  todos: Pick<Todo, 'text'>[];
  listId: string;
}>();

sample({
  clock: addTodo,
  source: {
    userId: userModel.selectors.$userId,
  },
  target: [todoListModel.events.addManyTodo, addTodoFx],
  fn: ({ userId }, { todos: todoTexts, listId }) => {
    const todos: AddManyTodoInputs = todoTexts.map(({ text }) => {
      const createdAt = dateToTimestamptz(new Date());

      return {
        id: uuidv4(),
        text,
        isComplete: false,
        listId,
        userId: userId ?? '',
        createdAt,
        updatedAt: createdAt,
      };
    });

    return todos;
  },
});

export const events = {
  addTodo,
};
