import { createEffect, createEvent, sample } from 'effector';

import {
  todoListApi,
  todoListModel,
  UpdateTodoListInputs,
} from '~/entities/TodoList';
import { TodoList } from '~/shared/types';
import { dateToTimestamptz } from '~/shared/utils';

const updateTodoListLabelFx = createEffect<UpdateTodoListInputs, TodoList>(
  async (props) => {
    const { data, error } = await todoListApi.updateTodoList(props);

    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('Error while updating list of todos');
    }

    return data;
  },
);

const updateTodoListLabel = createEvent<Pick<TodoList, 'label' | 'id'>>();

sample({
  clock: updateTodoListLabel,
  target: [todoListModel.events.updateTodoList, updateTodoListLabelFx],
  fn: ({ label, id }) => {
    const updatedAt = dateToTimestamptz(new Date());
    const updates: UpdateTodoListInputs = {
      id,
      label,
      updatedAt,
    };

    return updates;
  },
});

export const events = { updateTodoListLabel };
