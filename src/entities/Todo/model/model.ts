import { NullableOptional, Todo } from '~/shared/types';

export type GetTodosByDateInputs = Pick<Todo, 'date'>;
export type AddManyTodosInputs = { todos: Todo[] } & Pick<Todo, 'listId'>;
export type DeleteTodoInputs = Pick<Todo, 'id' | 'listId'>;
export type UpdateTodoInputs = Pick<Todo, 'id' | 'listId'> & {
  updates: Pick<Todo, 'updatedAt'> &
    NullableOptional<Pick<Todo, 'text' | 'isComplete'>>;
};
