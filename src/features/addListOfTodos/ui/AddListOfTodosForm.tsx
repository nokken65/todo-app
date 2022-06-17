import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { AddListOfTodosInputs } from '~/entities/ListOfTodos';
import { ButtonWithLoader } from '~/shared/components';
import { AddIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';

import { effects } from '../model';
import { addListOfTodosSchema } from '../validation';

type AddListOfTodosFormProps = {
  closeButton?: ReactNode;
  onSubmit: (props: Pick<AddListOfTodosInputs, 'label'>) => void;
};

const AddListOfTodosFormView = ({
  closeButton,
  onSubmit,
}: AddListOfTodosFormProps) => {
  const methods = useForm<Pick<AddListOfTodosInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(addListOfTodosSchema),
    defaultValues: { label: '' },
  });

  return (
    <Form {...methods} resetOnSubmitSuccessful onSubmit={onSubmit}>
      <Form.Field
        autoFocus
        after={
          <ButtonWithLoader
            className='justify-center w-10 font-bold text-white bg-violet-600'
            disabled={methods.formState.isSubmitting}
            isLoading={methods.formState.isSubmitting}
            type='submit'
          >
            <AddIcon className='w-4 h-4' />
          </ButtonWithLoader>
        }
        before={closeButton}
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
  },
});
