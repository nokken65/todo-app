import { createEvent, createStore, sample } from 'effector';

import { timestampToDate } from '~/shared/utils';

const selectDate = createEvent<string>();

const $selectedDate = createStore<string>(timestampToDate(new Date())).on(
  selectDate,
  (_, payload) => payload,
);

const $currentDate = createStore<string>(timestampToDate(new Date()));

const $selectedDateIsCurrent = sample({
  source: [$selectedDate, $currentDate],
  fn: ([selected, current]) => selected === current,
});

export const selectors = {
  $selectedDate,
  $currentDate,
  $selectedDateIsCurrent,
};

export const events = {
  selectDate,
};
