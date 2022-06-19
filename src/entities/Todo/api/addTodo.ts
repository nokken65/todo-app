import { supabase } from '~/shared/api';
import type { Todo } from '~/shared/types';

import { AddTodoInputs } from '../model/model';

type AddTodoProps = AddTodoInputs;

export const addTodo = async ({
  text,
  isComplete,
  listId,
}: AddTodoProps): Promise<{
  data: Todo | null;
  error: Error | null;
}> => {
  const user = supabase.auth.user();

  if (!user) {
    return { data: null, error: new Error('Cannot find user') };
  }

  const { data, error } = await supabase
    .from<Todo>('todos')
    .insert({ text, isComplete, listId, userId: user.id })
    .single();

  return { data, error: error ? new Error(error.message) : null };
};
