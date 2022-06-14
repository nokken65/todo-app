import { supabase } from '~/shared/api';
import type { TodoList } from '~/shared/types';
import { convertDateStringToPostgresStyle } from '~/shared/utils';

import { GetListOfTodosInputs } from '../model/model';

type GetListsOfTodosProps = GetListOfTodosInputs;

export const getListsOfTodos = async ({
  date,
}: GetListsOfTodosProps): Promise<{
  data: TodoList[] | null;
  error: Error | null;
}> => {
  const convertedDate = convertDateStringToPostgresStyle(date);

  const { data, error } = await supabase
    .from<TodoList>('todo_lists')
    .select('*')
    .eq('date', convertedDate)
    .order('created_at', { ascending: false });

  return { data, error: error ? new Error(error.message) : null };
};
