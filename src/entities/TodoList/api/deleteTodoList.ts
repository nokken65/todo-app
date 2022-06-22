import { supabase } from '~/shared/api';
import type { Response, TodoList } from '~/shared/types';

import type { DeleteTodoListInputs } from '../model/model';

type DeleteTodoListProps = DeleteTodoListInputs;
export const deleteTodoList = async ({
  id,
}: DeleteTodoListProps): Promise<Response<{}>> => {
  try {
    const { data, error } = await supabase
      .from<TodoList>('lists')
      .delete()
      .match({ id });

    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (err) {
    const error = err as Error;

    return { data: null, error };
  }
};
