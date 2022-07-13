import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import { AddTodoListInputs } from '../model/model';

type AddTodoListProps = AddTodoListInputs;

export const addTodoList = async (
  todoList: AddTodoListProps,
): Promise<Response<TodoList>> => {
  try {
    const { data } = await supabase
      .from<TodoList>('lists')
      .insert(todoList)
      .throwOnError(true)
      .single();

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
