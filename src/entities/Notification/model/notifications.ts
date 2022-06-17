import { createEvent, createStore, sample } from 'effector';

import { Notification } from './model';

const addNotification = createEvent<Notification>();
const removeNotification = createEvent<Pick<Notification, 'id'>>();

const $notifications = createStore<Notification[]>([])
  .on(addNotification, (state, payload) => [...state, payload])
  .on(removeNotification, (state, payload) =>
    state.filter(({ id }) => id !== payload.id),
  );

sample({
  clock: addNotification,
  fn: ({ id, duration }) =>
    duration &&
    setTimeout(() => {
      removeNotification({ id });
    }, duration),
});

export const selectors = {
  $notifications,
};

export const events = {
  addNotification,
  removeNotification,
};
