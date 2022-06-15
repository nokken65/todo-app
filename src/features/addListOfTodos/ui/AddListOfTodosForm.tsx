import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { ReactNode, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AddListOfTodosInputs } from '~/entities/ListOfTodos';
import { Button, Form } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

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
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Pick<AddListOfTodosInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(addListOfTodosSchema),
    defaultValues: { label: '' },
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className='flex flex-col w-full h-full gap-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex w-full h-full gap-2'>
        <Controller
          control={control}
          defaultValue=''
          name='label'
          render={({ field, formState }) => (
            <Form.InputField
              autoFocus
              className='h-10'
              isError={!!formState.errors.label}
              isSubmitting={formState.isSubmitting}
              isValid={formState.isValid}
              placeholder='At work'
              type='text'
              {...field}
              after={
                <Button
                  className={clsx(
                    'justify-center w-10 text-white bg-violet-600 rounded-none',
                    formState.isSubmitting && 'animate-pulse',
                  )}
                  disabled={!formState.isValid}
                  type='submit'
                >
                  <AddIcon className='w-4 h-4' />
                </Button>
              }
              before={closeButton}
              value={field.value?.replace(/\s+/g, ' ')}
            />
          )}
        />
      </div>
      {errors.label && <Form.ErrorFeedback message={errors.label.message} />}
    </form>
  );
};

export const AddListOfTodosForm = reflect({
  view: AddListOfTodosFormView,
  bind: {
    onSubmit: effects.addListOfTodosFx,
  },
});
