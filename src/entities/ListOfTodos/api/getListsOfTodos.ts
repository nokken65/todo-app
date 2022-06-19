import { supabase } from '~/shared/api';
import type { TodoList } from '~/shared/types';
import { convertDateStringToPostgresStyle } from '~/shared/utils';

import { GetListOfTodosInputs } from '../model/model';

type GetListsOfTodosProps = GetListOfTodosInputs;

export const getListsOfTodos = async ({
  date,
  filterByLabel,
}: GetListsOfTodosProps): Promise<{
  data: TodoList[] | null;
  error: Error | null;
}> => {
  const convertedDate = convertDateStringToPostgresStyle(date);

  // TODO: double fetch on init load

  const { data, error } = await supabase
    .from<TodoList>('lists')
    .select('*, todos(*)')
    .eq('date', convertedDate)
    .ilike('label', filterByLabel ? `%${filterByLabel}%` : '*')
    .order('createdAt', { ascending: false });

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return { data, error: null };
};
