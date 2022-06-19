import { supabase } from '~/shared/api';
import { Todo } from '~/shared/types';

import { DeleteTodoInputs } from '../model/model';

type DeleteTodoProps = DeleteTodoInputs;

export const deleteTodo = async ({
  id,
}: DeleteTodoProps): Promise<{
  error: Error | null;
}> => {
  const { error } = await supabase.from<Todo>('todos').delete().match({ id });

  return { error: error ? new Error(error.message) : null };
};
