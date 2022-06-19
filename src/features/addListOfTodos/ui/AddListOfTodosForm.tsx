import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { AddListOfTodosInputs } from '~/entities/ListOfTodos';
import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';

import { effects, events } from '../model';
import { addListOfTodosSchema } from '../validation';

type AddListOfTodosFormProps = {
  onSubmit: (props: Pick<AddListOfTodosInputs, 'label'>) => void;
  onBlur: () => void;
};

const AddListOfTodosFormView = ({
  onSubmit,
  onBlur,
}: AddListOfTodosFormProps) => {
  const methods = useForm<Pick<AddListOfTodosInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(addListOfTodosSchema),
    defaultValues: { label: '' },
  });

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
      onBlur={onBlur}
      onSubmit={onSubmit}
    >
      <Form.Field
        autoFocus
        after={
          <Button
            htmlType='submit'
            icon={<AddIcon className='w-4 h-4' />}
            isLoading={methods.formState.isSubmitting}
            rounded={false}
          />
        }
        name='label'
        placeholder='At work'
        type='text'
      />
    </Form>
  );
};

export const AddListOfTodosForm = reflect({
  view: AddListOfTodosFormView,
  bind: {
    onSubmit: effects.addListOfTodosFx,
    onBlur: events.changeEditState,
  },
});
