import { NullableOptional, TodoList } from '~/shared/types';

export type GetTodoListsInputs = Pick<TodoList, 'date'> &
  NullableOptional<Pick<TodoList, 'label'>>;
export type AddTodoListInputs = Pick<TodoList, 'label' | 'date'>;
export type DeleteTodoListInputs = Pick<TodoList, 'id'>;
export type UpdateTodoListInputs = Pick<TodoList, 'id'> &
  NullableOptional<Pick<TodoList, 'label'>>;
