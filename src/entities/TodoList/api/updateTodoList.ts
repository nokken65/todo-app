/* eslint-disable camelcase */
import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { UpdateTodoListInputs } from '../model/model';

type UpdateTodoListProps = UpdateTodoListInputs;
export const updateTodoList = async ({
  id,
  ...obj
}: UpdateTodoListProps): Promise<Response<TodoList>> => {
  try {
    const updates = Object.keys(obj)
      .filter((k) => Boolean(obj[k]))
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

    const { data, error } = await supabase
      .from<TodoList>('lists')
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
