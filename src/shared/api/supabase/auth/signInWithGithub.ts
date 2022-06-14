import { supabase } from '../client';

export const signInWithGithub = async () => {
  try {
    const { error } = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      // { redirectTo: 'http://192.168.1.7:3000/feed' },
    );
    if (error) {
      throw new Error('Auth error');
    }
  } catch (error) {
    throw new Error('Auth error');
  }
};
