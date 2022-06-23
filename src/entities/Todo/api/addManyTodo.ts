import { supabase } from '~/shared/api';
import type { Response, Todo } from '~/shared/types';

import { AddManyTodoInputs } from '../model/model';

type AddManyTodoProps = AddManyTodoInputs;

export const addManyTodo = async (
  todos: AddManyTodoProps,
): Promise<Response<Todo[]>> => {
  try {
    const { data, error } = await supabase.from<Todo>('todos').insert(todos);

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
