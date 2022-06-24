import { supabase } from '~/shared/api';
import { Response, Todo } from '~/shared/types';

import { UpdateTodoInputs } from '../model/model';

type UpdateTodoProps = UpdateTodoInputs;

export const updateTodo = async ({
  id,
  updates,
}: UpdateTodoProps): Promise<Response<Todo>> => {
  try {
    const { data, error } = await supabase
      .from<Todo>('todos')
      .update(updates)
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
