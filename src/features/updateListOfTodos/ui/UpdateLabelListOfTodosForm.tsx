import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { UpdateListOfTodosInputs } from '~/entities/ListOfTodos';
import { ButtonWithLoader } from '~/shared/components';
import { EditIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { TodoList } from '~/shared/types';

import { events } from '../model';
import { updateLabelListOfTodosSchema } from '../validation';

type UpdateLabelListOfTodosFormProps = Pick<TodoList, 'id' | 'label'> & {
  onSubmit: (props: Pick<UpdateListOfTodosInputs, 'label' | 'id'>) => void;
  onClose: () => void;
};

const UpdateLabelListOfTodosFormView = ({
  id,
  label,
  onSubmit,
  onClose,
}: UpdateLabelListOfTodosFormProps) => {
  const methods = useForm<Pick<UpdateListOfTodosInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(updateLabelListOfTodosSchema),
    defaultValues: { label: '' },
  });

  const {
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Form
      {...methods}
      onSubmit={(data) =>
        // eslint-disable-next-line no-nested-ternary
        data.label === label
          ? onClose()
          : data.label
          ? onSubmit({ ...data, id })
          : onClose()
      }
    >
      <Form.Field
        autoFocus
        before={
          <ButtonWithLoader
            className='justify-center w-10 font-bold text-white bg-violet-600'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type='submit'
          >
            <EditIcon className='w-5 h-5' />
          </ButtonWithLoader>
        }
        className='!h-10 max-w-md'
        name='label'
        placeholder='At work'
        type='text'
      />
    </Form>
  );
};

export const UpdateLabelListOfTodosForm = reflect({
  view: UpdateLabelListOfTodosFormView,
  bind: {
    onSubmit: events.updateLabelListOfTodos,
    onClose: events.setListOfTodosBeingUpdated,
  },
});
