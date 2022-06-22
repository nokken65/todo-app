import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { AddTodoListInputs } from '../model/model';

type AddTodoListProps = AddTodoListInputs;

export const addTodoList = async ({
  label,
  date,
}: AddTodoListProps): Promise<Response<TodoList>> => {
  try {
    const user = supabase.auth.user();

    if (!user) {
      throw new Error('Cannot find user');
    }

    const { data, error } = await supabase
      .from<TodoList>('lists')
      .insert({ date, label, userId: user.id })
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
