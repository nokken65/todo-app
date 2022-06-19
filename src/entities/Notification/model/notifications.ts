import { createEvent, createStore, sample } from 'effector';

import { Notification } from './model';

const addNotification = createEvent<Omit<Notification, 'id'>>();
const removeNotification = createEvent<Pick<Notification, 'id'>>();
const removeAllNotifications = createEvent<void>();

const addNotificationWithId = sample({
  clock: addNotification,
  fn: (props) => ({ ...props, id: `${Math.random()}` }),
});

const $notifications = createStore<Notification[]>([])
  .on(addNotificationWithId, (state, payload) => [...state, payload])
  .on(removeNotification, (state, payload) =>
    state.filter(({ id }) => id !== payload.id),
  )
  .on(removeAllNotifications, () => []);

const $latestNotification = $notifications.map((notifications) =>
  notifications.length > 0 ? notifications[notifications.length - 1] : null,
);

sample({
  clock: addNotification,
  source: { notifications: $notifications },
  fn: ({ notifications }, { duration }) =>
    duration !== 0
      ? setTimeout(() => {
          removeNotification({
            id: notifications[notifications.length - 1].id,
          });
        }, duration)
      : null,
});

export const selectors = {
  $notifications,
  $latestNotification,
};

export const events = {
  addNotification,
  removeNotification,
  removeAllNotifications,
};
