import { NullableOptional, Todo } from '~/shared/types';

export type AddTodoInputs = Pick<Todo, 'text' | 'isComplete' | 'listId'>;
export type DeleteTodoInputs = Pick<Todo, 'id'>;
export type UpdateTodoInputs = Pick<Todo, 'id'> &
  NullableOptional<Pick<Todo, 'text' | 'isComplete'>>;
