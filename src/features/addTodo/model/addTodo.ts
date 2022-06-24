import { createEffect, createEvent, sample } from 'effector';
import { v4 as uuidv4 } from 'uuid';

import { dateModel } from '~/entities/Date';
import { AddManyTodosInputs, todoApi, todoModel } from '~/entities/Todo';
import { userModel } from '~/entities/User';
import type { Todo } from '~/shared/types';
import { dateToTimestamptz } from '~/shared/utils';

const addTodoFx = createEffect<AddManyTodosInputs, Todo[]>(async (todos) => {
  const { data, error } = await todoApi.addManyTodos(todos);

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
    date: dateModel.selectors.$selectedDate,
    userId: userModel.selectors.$userId,
  },
  target: [todoModel.events.addManyTodos, addTodoFx],
  fn: ({ date, userId }, { todos: todoTexts, listId }) => {
    const todos: Todo[] = todoTexts.map(({ text }) => {
      const createdAt = dateToTimestamptz(new Date());

      return {
        id: uuidv4(),
        text,
        isComplete: false,
        listId,
        userId: userId ?? '',
        date,
        createdAt,
        updatedAt: createdAt,
      };
    });

    return { todos, listId };
  },
});

export const events = {
  addTodo,
};
