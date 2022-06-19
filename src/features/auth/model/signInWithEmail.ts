import { createEffect } from 'effector';

import { notificationModel } from '~/entities/Notification';
import { userModel } from '~/entities/User';

import { signInWithEmail } from '../api';
import { SignInWithEmailInputs } from './model';

const signInWithEmailFx = createEffect<
  SignInWithEmailInputs,
  { params: SignInWithEmailInputs }
>(async (props) => {
  const { error } = await signInWithEmail(props);

  if (error) {
    throw error;
  }

  return { params: props };
});

signInWithEmailFx.doneData.watch((payload) => {
  notificationModel.events.addNotification({
    duration: 0,
    content: `Check your email "${payload.params.email}" to log in`,
    type: 'message',
  });
});

signInWithEmailFx.fail.watch((payload) => {
  notificationModel.events.addNotification({
    duration: 3000,
    content: payload.error.message,
    type: 'error',
  });
});

userModel.events.setUser.watch(() =>
  notificationModel.events.removeAllNotifications(),
);

export const effects = {
  signInWithEmailFx,
};
