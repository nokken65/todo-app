/* eslint-disable camelcase */
import { supabase } from '~/shared/api';

import { SignInWithEmailInputs } from '../model/model';

type SignInWithEmailProps = SignInWithEmailInputs;

export const signInWithEmail = async ({
  email,
}: SignInWithEmailProps): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signIn({ email });

    return { error: error ? new Error(error.message) : null };
  } catch (error) {
    throw new Error('Auth error');
  }
};
