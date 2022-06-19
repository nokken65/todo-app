import { supabase } from '~/shared/api';
import { TodoList } from '~/shared/types';

import { DeleteListOfTodosInputs } from '../model/model';

type DeleteListOfTodosProps = DeleteListOfTodosInputs;
export const deleteListOfTodos = async ({
  id,
}: DeleteListOfTodosProps): Promise<{
  error: Error | null;
}> => {
  const { error } = await supabase
    .from<TodoList>('lists')
    .delete()
    .match({ id });

  return { error: error ? new Error(error.message) : null };
};
