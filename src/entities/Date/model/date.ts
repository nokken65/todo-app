import { createEvent, createStore } from 'effector';

import type { DateString } from '~/shared/types';
import { format } from '~/shared/utils';

const selectDate = createEvent<DateString>();

const $selectedDate = createStore<DateString>(format(new Date())).on(
  selectDate,
  (_, payload) => payload,
);

const $currentDate = createStore<DateString>(format(new Date()));

export const selectors = {
  $selectedDate,
  $currentDate,
};

export const events = {
  selectDate,
};
