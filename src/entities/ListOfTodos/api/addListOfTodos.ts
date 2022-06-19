import { supabase } from '~/shared/api';
import type { TodoList } from '~/shared/types';

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

  const { data, error } = await supabase
    .from<TodoList>('lists')
    .insert({ date, label, userId: user.id })
    .single();

  return { data, error: error ? new Error(error.message) : null };
};
