import { definitions } from './generatedSupabaseTypes';

export type Todo = definitions['todos'];
export type TodoList = definitions['lists'] & { todos: Todo[] };
