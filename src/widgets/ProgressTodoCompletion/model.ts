import { combine } from 'effector';

import { todoModel } from '~/entities/Todo';

const $progress = combine(todoModel.selectors.$todos, (todos) => {
  if (todos.length === 0) {
    return 0;
  }

  const completedCount = todos.filter(({ isComplete }) => isComplete).length;

  return (completedCount * 100) / todos.length;
});

export { $progress };
