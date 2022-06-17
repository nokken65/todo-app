import { createEffect, sample } from 'effector';

import { notificationModel } from '~/entities/Notification';

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

sample({
  clock: signInWithEmailFx.done,
});

signInWithEmailFx.doneData.watch((payload) => {
  notificationModel.events.addNotification({
    id: `${Math.random()}`,
    duration: 0,
    content: `Check your email "${payload.params.email}" to log in`,
    type: 'message',
  });
});

signInWithEmailFx.fail.watch((payload) => {
  notificationModel.events.addNotification({
    id: `${Math.random()}`,
    duration: 60000,
    content: payload.error.message,
    type: 'error',
  });
});

signInWithEmailFx.fail.watch(console.error);

export const effects = {
  signInWithEmailFx,
};
