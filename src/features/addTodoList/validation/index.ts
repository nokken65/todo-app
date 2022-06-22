import * as yup from 'yup';

export const addTodoListSchema = yup.object({
  label: yup.string().max(40, 'Too long!').required('Cannot be empty!').trim(),
});
