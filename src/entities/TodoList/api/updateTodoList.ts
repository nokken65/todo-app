/* eslint-disable camelcase */
import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { UpdateTodoListInputs } from '../model/model';

type UpdateTodoListProps = UpdateTodoListInputs;
export const updateTodoList = async ({
  id,
  label,
}: UpdateTodoListProps): Promise<Response<TodoList>> => {
  try {
    const { data, error } = await supabase
      .from<TodoList>('lists')
      .update({ label })
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
