import * as yup from 'yup';

export const addListOfTodosSchema = yup.object({
  label: yup.string().max(40, 'Too long!').required('Cannot be empty!'),
});
