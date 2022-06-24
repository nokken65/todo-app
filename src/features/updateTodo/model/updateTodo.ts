import { createEffect, createEvent, sample } from 'effector';

import { todoApi, todoModel, UpdateTodoInputs } from '~/entities/Todo';
import { Todo } from '~/shared/types';
import { dateToTimestamptz } from '~/shared/utils';

const updateTodoFx = createEffect<UpdateTodoInputs, Todo>(async (props) => {
  const { data, error } = await todoApi.updateTodo(props);

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('Error while updating list of todos');
  }

  return data;
});

const updateTodoCompletion =
  createEvent<Pick<Todo, 'id' | 'listId' | 'isComplete'>>();

sample({
  clock: updateTodoCompletion,
  target: [todoModel.events.updateTodo, updateTodoFx],
  fn: ({ id, listId, isComplete }) => {
    const updatedAt = dateToTimestamptz(new Date());
    const updates: UpdateTodoInputs = {
      id,
      listId,
      updates: {
        isComplete,
        updatedAt,
      },
    };

    return updates;
  },
});

// debounce({
//   source: updateTodo,
//   timeout: 200,
//   target: updateTodoFx,
// });

export const events = { updateTodoCompletion };
