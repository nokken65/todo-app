/* eslint-disable camelcase */
import { supabase } from '~/shared/api';
import { Todo } from '~/shared/types';

import { UpdateTodoInputs } from '../model/model';

type UpdateTodoProps = UpdateTodoInputs & {
  [key: string]: string | boolean | undefined;
};

export const updateTodo = async ({
  id,
  ...obj
}: UpdateTodoProps): Promise<{
  data: Todo | null;
  error: Error | null;
}> => {
  const updates = Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

  const { data, error } = await supabase
    .from<Todo>('todos')
    .update(updates)
    .eq('id', id)
    .single();

  return { data, error: error ? new Error(error.message) : null };
};
