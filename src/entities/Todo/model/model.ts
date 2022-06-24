import { NullableOptional, Todo } from '~/shared/types';

export type AddOneTodoInputs = Todo;
export type AddManyTodoInputs = Todo[];
export type DeleteTodoInputs = Pick<Todo, 'id' | 'listId'>;
export type UpdateTodoInputs = Pick<Todo, 'id' | 'listId'> & {
  updates: Pick<Todo, 'updatedAt'> &
    NullableOptional<Pick<Todo, 'text' | 'isComplete'>>;
};
