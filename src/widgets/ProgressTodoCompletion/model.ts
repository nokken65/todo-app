import { combine } from 'effector';

import { dateModel } from '~/entities/Date';
import { todoModel } from '~/entities/Todo';

const $progress = combine(
  {
    todosMap: todoModel.selectors.$todosMapByDate,
    date: dateModel.selectors.$selectedDate,
  },
  ({ todosMap, date }) => {
    if ((todosMap[date] ?? []).length === 0) {
      return 0;
    }

    const completedCount = todosMap[date].filter(
      ({ isComplete }) => isComplete,
    ).length;

    return (completedCount * 100) / todosMap[date].length;
  },
);

export { $progress };
