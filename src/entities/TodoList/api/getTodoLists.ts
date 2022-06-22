import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { GetTodoListsInputs } from '../model/model';

type GetTodoListsProps = GetTodoListsInputs;

export const getTodoLists = async ({
  date,
  label = '*',
}: GetTodoListsProps): Promise<Response<TodoList[]>> => {
  try {
    const queryString = new URLSearchParams(window.location.search).get('q');
    const { data, error } = await supabase
      .from<TodoList>('lists')
      .select('*, todos(*)')
      .eq('date', date)
      .ilike('label', `%${queryString ?? label}%`)
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
