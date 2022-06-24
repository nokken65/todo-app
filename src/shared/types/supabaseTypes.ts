import { definitions } from './generatedSupabaseTypes';

export type Todo = definitions['todos'];
export type TodoList = definitions['lists'];

export type Response<T> = { data: T | null; error: Error | null };
