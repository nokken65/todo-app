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
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
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
        data.label === label ? onClose() : onSubmit({ ...data, id }),
      )}
    >
      <div className='flex w-full h-full gap-2'>
        <Button
          className={clsx(
            'justify-center w-10 h-10 text-white bg-violet-600',
            isSubmitting && 'animate-pulse',
          )}
          disabled={!isValid}
          type='submit'
        >
          <EditIcon className='w-4 h-4' />
        </Button>
        <Controller
          control={control}
          defaultValue=''
          name='label'
          render={({ field }) => (
            <Form.InputField
              autoFocus
              className='h-10 max-w-xs'
              isError={!!errors.label}
              isSubmitting={isSubmitting}
              isValid={isValid}
              placeholder='At work'
              type='text'
              {...field}
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
