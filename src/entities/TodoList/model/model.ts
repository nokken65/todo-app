import { NullableOptional, TodoList } from '~/shared/types';

export type GetTodoListsByDateInputs = Pick<TodoList, 'date'>;
export type AddTodoListInputs = TodoList;
export type DeleteTodoListInputs = Pick<TodoList, 'id'>;
export type UpdateTodoListInputs = Pick<TodoList, 'id'> & {
  updates: Pick<TodoList, 'updatedAt'> &
    NullableOptional<Pick<TodoList, 'label'>>;
};
