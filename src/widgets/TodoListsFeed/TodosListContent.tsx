import { reflect } from '@effector/reflect';
import { memo } from 'react';

import { TodoItem } from '~/entities/Todo';
import { updateTodoModel } from '~/features/updateTodo';
import { Todo } from '~/shared/types';

type TodosListItemProps = {
  todo: Todo;
  updateTodoCompletion: (
    props: Pick<Todo, 'id' | 'listId' | 'isComplete'>,
  ) => void;
};

const TodosListItemView = ({
  todo,
  updateTodoCompletion,
}: TodosListItemProps) => {
  return (
    <li key={todo.id}>
      <TodoItem
        isComplete={todo.isComplete}
        key={todo.id}
        text={todo.text}
        onComplete={() =>
          updateTodoCompletion({
            id: todo.id,
            listId: todo.listId,
            isComplete: !todo.isComplete,
          })
        }
      />
    </li>
  );
};

const TodosListItem = reflect({
  view: TodosListItemView,
  bind: {
    updateTodoCompletion: updateTodoModel.events.updateTodoCompletion,
  },
});

type TodosListContentProps = {
  todos: Todo[];
};

const TodosListContentView = ({ todos }: TodosListContentProps) => {
  return (
    <ul className='flex flex-col mb-4'>
      {todos.map((todo) => (
        <TodosListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export const TodosListContent = memo(TodosListContentView);
