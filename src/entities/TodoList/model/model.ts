import { NullableOptional, TodoList } from '~/shared/types';

export type GetTodoListsInputs = Pick<TodoList, 'date'>;
export type AddTodoListInputs = Omit<TodoList, 'todos'>;
export type DeleteTodoListInputs = Pick<TodoList, 'id'>;
export type UpdateTodoListInputs = Pick<TodoList, 'id' | 'updatedAt'> &
  NullableOptional<Pick<TodoList, 'label'>> & {
    [key: string]: string;
  };
