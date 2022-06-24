import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { GetTodoListsByDateInputs } from '../model/model';

type GetTodoListsByDateProps = GetTodoListsByDateInputs;

export const getTodoListsByDate = async ({
  date,
}: GetTodoListsByDateProps): Promise<Response<TodoList[]>> => {
  try {
    const { data, error } = await supabase
      .from<TodoList>('lists')
      .select('*')
      .eq('date', date)
      .order('createdAt', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
