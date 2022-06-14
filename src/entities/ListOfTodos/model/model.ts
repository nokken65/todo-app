import { NullableOptional, TodoList } from '~/shared/types';

export type GetListOfTodosInputs = Pick<TodoList, 'date'>;
export type AddListOfTodosInputs = Pick<TodoList, 'label' | 'date'>;
export type DeleteListOfTodosInputs = Pick<TodoList, 'id'>;
export type UpdateListOfTodosInputs = Pick<TodoList, 'id'> &
  NullableOptional<Pick<TodoList, 'label' | 'todo_ids'>>;
