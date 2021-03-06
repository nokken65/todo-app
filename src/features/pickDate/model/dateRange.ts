import { createEvent, createStore, forward, sample } from 'effector';

import { dateModel } from '~/entities/Date';
import { todoModel } from '~/entities/Todo';
import { todoListModel } from '~/entities/TodoList';
import { DateString } from '~/shared/types';
import { format, formattedDistance } from '~/shared/utils';

const updateDateRange = createEvent<DateString>();

const $dateRange = createStore<DateString[]>(
  formattedDistance({ date: format(new Date()), amount: 14 }),
).on(updateDateRange, (_, payload) =>
  formattedDistance({ date: payload, amount: 14 }),
);

forward({
  from: dateModel.selectors.$selectedDate,
  to: updateDateRange,
});

sample({
  clock: dateModel.selectors.$selectedDate,
  source: todoListModel.selectors.$todoListsMap,
  target: todoListModel.effects.getTodoListsByDateFx,
  filter: (todoListsMap, date) => !todoListsMap[date],
});

sample({
  clock: dateModel.selectors.$selectedDate,
  source: todoModel.selectors.$todosMapByDate,
  target: todoModel.effects.getTodosByDateFx,
  filter: (todosMapByDate, date) => !todosMapByDate[date],
});

export const selectors = {
  $dateRange,
};
