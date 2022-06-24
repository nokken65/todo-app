import { reflect } from '@effector/reflect';
import { useList } from 'effector-react';
import { memo } from 'react';

import { TodoItem, todoModel } from '~/entities/Todo';
import { updateTodoModel } from '~/features/updateTodo';
import { Todo } from '~/shared/types';

type TodosItemProps = {
  todo: Todo;
  updateTodoCompletion: (
    props: Pick<Todo, 'id' | 'listId' | 'isComplete'>,
  ) => void;
};

const TodosItemView = ({ todo, updateTodoCompletion }: TodosItemProps) => {
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

const TodosItem = reflect({
  view: TodosItemView,
  bind: {
    updateTodoCompletion: updateTodoModel.events.updateTodoCompletion,
  },
});

type TodosContentProps = {
  listId: string;
};

const TodosContentView = ({ listId }: TodosContentProps) => {
  const todos = useList(
    todoModel.selectors.$todos,
    (todo) => todo.listId === listId && <TodosItem todo={todo} />,
  );

  return <ul className='flex flex-col mb-4'>{todos}</ul>;
};

export const TodosContent = memo(TodosContentView);
