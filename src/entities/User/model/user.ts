import { User } from '@supabase/supabase-js';
import { createEvent, createStore } from 'effector';

import { supabase } from '~/shared/api';

const setUser = createEvent<User | null>();

const $user = createStore<User | null>(supabase.auth.user()).on(
  setUser,
  (_, payload) => payload,
);

export const events = {
  setUser,
};

export const selectors = {
  $user,
};
