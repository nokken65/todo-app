import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { GetTodoListsByDateInputs } from '../model/model';

type GetTodoListsProps = GetTodoListsByDateInputs;

export const getTodoLists = async ({
  date,
}: GetTodoListsProps): Promise<Response<TodoList[]>> => {
  try {
    // TODO: suffling todos position
    const { data, error } = await supabase
      .from<TodoList>('lists')
      .select('*, todos(*)')
      .eq('date', date)
      .order('createdAt', { ascending: false })
      .order('createdAt', { ascending: true, foreignTable: 'todos' })
      .order('id', { ascending: false, foreignTable: 'todos' });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
