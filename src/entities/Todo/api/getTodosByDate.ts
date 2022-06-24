import { supabase } from '~/shared/api';
import type { Response, Todo } from '~/shared/types';

import type { GetTodosByDateInputs } from '../model/model';

type GetTodosByDateProps = GetTodosByDateInputs;

export const getTodosByDate = async ({
  date,
}: GetTodosByDateProps): Promise<Response<Todo[]>> => {
  try {
    const { data, error } = await supabase
      .from<Todo>('todos')
      .select('*')
      .eq('date', date)
      .order('createdAt', { ascending: false })
      .order('id', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
