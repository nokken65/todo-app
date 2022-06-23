import { NullableOptional, Todo } from '~/shared/types';

export type AddOneTodoInputs = Todo;
export type AddManyTodoInputs = Todo[];
export type DeleteTodoInputs = Pick<Todo, 'id'>;
export type UpdateTodoInputs = Pick<Todo, 'id'> &
  NullableOptional<Pick<Todo, 'text' | 'isComplete'>>;
