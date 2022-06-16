import { createEffect } from 'effector';

import { signInWithEmail } from '../api';
import { SignInWithEmailInputs } from './model';

const signInWithEmailFx = createEffect<SignInWithEmailInputs, void>(
  async (props) => {
    const { error } = await signInWithEmail(props);

    if (error) {
      throw error;
    }
  },
);

signInWithEmailFx.fail.watch(console.error);

export const effects = {
  signInWithEmailFx,
};
