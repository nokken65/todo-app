import * as yup from 'yup';

export const updateLabelListOfTodosSchema = yup.object({
  label: yup.string().max(40, 'Too long!').trim(),
});
