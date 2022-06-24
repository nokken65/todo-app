import { filterTodoListModel } from '~/features/filterTodoList';

const $progress = filterTodoListModel.selectors.$filteredTodoLists.map(
  (lists) => {
    if (lists.length === 0) {
      return 0;
    }
    const todos = lists.flatMap((list) => list.todos ?? []);

    if (todos.length === 0) {
      return 0;
    }
    const todosCount = todos.length;
    const completedCount = todos.filter(({ isComplete }) => isComplete).length;

    return (completedCount * 100) / todosCount;
  },
);

export { $progress };
