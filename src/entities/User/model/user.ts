import { User } from '@supabase/supabase-js';
import { createEffect, createEvent, createStore } from 'effector';

import { supabase } from '~/shared/api';

const getUserFx = createEffect<void, User | null>(() => {
  const user = supabase.auth.user();

  return user;
});

const setUser = createEvent<User | null>();

const $user = createStore<User | null>(null)
  .on(getUserFx.doneData, (_, payload) => payload)
  .on(setUser, (_, payload) => payload);

export const effects = {
  getUserFx,
};

export const events = {
  setUser,
};

export const selectors = {
  $user,
};
