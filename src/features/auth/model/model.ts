import { UserAttributes } from '@supabase/supabase-js';

export type SignInWithEmailInputs = Pick<UserAttributes, 'email'>;

export type UserMetadata = { avatar_url?: string; name?: string };
