import { createEvent, createStore, forward, sample } from 'effector';

import { dateModel } from '~/entities/Date';
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
  clock: updateDateRange,
  target: todoListModel.effects.getTodoListsFx,
  fn: () => ({}),
});

// forward({
//   from: updateDateRange,
//   to: todoListModel.effects.getTodoListsFx,
// });

export const selectors = {
  $dateRange,
};

export const events = {
  updateDateRange,
};
