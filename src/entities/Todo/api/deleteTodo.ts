import { supabase } from '~/shared/api';
import type { Response, Todo } from '~/shared/types';

import { DeleteTodoInputs } from '../model/model';

type DeleteTodoProps = DeleteTodoInputs;

export const deleteTodo = async ({
  id,
}: DeleteTodoProps): Promise<Response<{}>> => {
  try {
    const { data, error } = await supabase
      .from<Todo>('todos')
      .delete()
      .match({ id });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
