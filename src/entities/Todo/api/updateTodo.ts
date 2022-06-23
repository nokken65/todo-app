/* eslint-disable camelcase */
import { supabase } from '~/shared/api';
import { Response, Todo } from '~/shared/types';

import { UpdateTodoInputs } from '../model/model';

type UpdateTodoProps = UpdateTodoInputs & {
  [key: string]: string | boolean | undefined;
};

export const updateTodo = async ({
  id,
  ...obj
}: UpdateTodoProps): Promise<Response<Todo>> => {
  try {
    const updates = Object.keys(obj)
      .filter((k) => obj[k] != null)
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

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
