import * as yup from 'yup';

export const addTodoSchema = yup.object().shape({
  todos: yup.array().of(
    yup.object().shape({
      text: yup
        .string()
        .max(40, 'Too long!')
        .required('Cannot be empty!')
        .trim(),
    }),
  ),
});
