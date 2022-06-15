import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { UpdateListOfTodosInputs } from '~/entities/ListOfTodos';
import { Button, Form } from '~/shared/components';
import { EditIcon } from '~/shared/icons';
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
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Pick<UpdateListOfTodosInputs, 'label'>>({
    mode: 'all',
    resolver: yupResolver(updateLabelListOfTodosSchema),
    defaultValues: { label },
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className='flex flex-col w-full h-full gap-2'
      onSubmit={handleSubmit((data) =>
        // eslint-disable-next-line no-nested-ternary
        data.label === label
          ? onClose()
          : data.label
          ? onSubmit({ ...data, id })
          : onClose(),
      )}
    >
      <div className='flex w-full h-full gap-2'>
        <Controller
          control={control}
          name='label'
          render={({ field, formState }) => (
            <Form.InputField
              autoFocus
              before={
                <Button
                  className={clsx(
                    'justify-center w-10 h-full text-white bg-violet-600',
                    formState.isSubmitting && 'animate-pulse',
                  )}
                  disabled={!formState.isValid}
                  type='submit'
                >
                  <EditIcon className='w-5 h-5' />
                </Button>
              }
              className='h-10 max-w-xs'
              isError={!!formState.errors.label}
              isSubmitting={formState.isSubmitting}
              isValid={formState.isValid}
              placeholder='At work'
              type='text'
              {...field}
              value={field.value?.replace(/\s+/g, ' ')}
            />
          )}
        />
      </div>
      {errors.label && <Form.ErrorFeedback message={errors.label.message} />}
    </form>
  );
};

export const UpdateLabelListOfTodosForm = reflect({
  view: UpdateLabelListOfTodosFormView,
  bind: {
    onSubmit: events.updateLabelListOfTodos,
    onClose: events.setListOfTodosBeingUpdated,
  },
});
