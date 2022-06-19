/* eslint-disable camelcase */
import { supabase } from '~/shared/api';
import { TodoList } from '~/shared/types';

import { UpdateListOfTodosInputs } from '../model/model';

type UpdateListOfTodosProps = UpdateListOfTodosInputs;
export const updateListOfTodos = async ({
  id,
  label,
}: UpdateListOfTodosProps): Promise<{
  data: TodoList | null;
  error: Error | null;
}> => {
  const { data, error } = await supabase
    .from<TodoList>('lists')
    .update({ label })
    .eq('id', id)
    .single();

  return { data, error: error ? new Error(error.message) : null };
};
