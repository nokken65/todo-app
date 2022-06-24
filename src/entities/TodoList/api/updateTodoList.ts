import pickBy from 'lodash.pickby';

import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { UpdateTodoListInputs } from '../model/model';

type UpdateTodoListProps = UpdateTodoListInputs;
export const updateTodoList = async ({
  id,
  updates,
}: UpdateTodoListProps): Promise<Response<TodoList>> => {
  try {
    const updatesObj = pickBy(updates, (value) => Boolean(value));

    const { data, error } = await supabase
      .from<TodoList>('lists')
      .update(updatesObj)
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
