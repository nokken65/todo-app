import * as yup from 'yup';

export const signInWithEmailSchema = yup.object({
  email: yup
    .string()
    .max(40, 'Too long!')
    .email('Not correct email')
    .required('Cannot be empty!')
    .trim(),
});
