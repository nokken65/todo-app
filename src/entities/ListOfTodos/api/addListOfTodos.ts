import { supabase } from '~/shared/api';
import type { TodoList } from '~/shared/types';
import { convertDateStringToPostgresStyle } from '~/shared/utils';

import { AddListOfTodosInputs } from '../model/model';

type AddListOfTodosProps = AddListOfTodosInputs;

export const addListOfTodos = async ({
  label,
  date,
}: AddListOfTodosProps): Promise<{
  data: TodoList | null;
  error: Error | null;
}> => {
  const user = supabase.auth.user();

  if (!user) {
    return { data: null, error: new Error('Cannot find user') };
  }

  const convertedDate = convertDateStringToPostgresStyle(date);

  const { data, error } = await supabase
    .from<TodoList>('todo_lists')
    .insert({ date: convertedDate, label, user_id: user.id, todo_ids: [] })
    .single();

  return { data, error: error ? new Error(error.message) : null };
};
