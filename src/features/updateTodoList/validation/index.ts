import * as yup from 'yup';

export const updateTodoListLabelSchema = yup.object({
  label: yup.string().max(40, 'Too long!').trim(),
});
