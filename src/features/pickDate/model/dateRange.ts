import { addDays } from 'date-fns';
import { createEvent, createStore, forward } from 'effector';

import { dateModel } from '~/entities/Date';
import { timestampToDate } from '~/shared/utils';

const updateDateRange = createEvent<string>();

const $dateRange = createStore<string[]>([]).on(
  updateDateRange,
  (_event, currentDate) => {
    const prevDates = [...Array(7)]
      .map((_, i) => timestampToDate(addDays(new Date(currentDate), -i - 1)))
      .reverse();
    const nextDates = [...Array(7)].map((_, i) =>
      timestampToDate(addDays(new Date(currentDate), i + 1)),
    );

    return [...prevDates, currentDate, ...nextDates];
  },
);

forward({
  from: dateModel.selectors.$selectedDate,
  to: updateDateRange,
});

export const selectors = {
  $dateRange,
};

export const events = {
  updateDateRange,
};