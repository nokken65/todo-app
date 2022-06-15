import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Form } from '~/shared/components';
import { AddIcon, SearchIcon } from '~/shared/icons';
import { TodoList } from '~/shared/types';

import { effects } from '../model';
import { searchListOfTodosSchema } from '../validation';

type SearchListOfTodosFormProps = {
  closeButton?: ReactNode;
  onSubmit: (props: Pick<TodoList, 'label'>) => void;
};

const SearchListOfTodosFormView = ({
  closeButton,
  onSubmit,
}: SearchListOfTodosFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Pick<TodoList, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(searchListOfTodosSchema),
    defaultValues: { label: '' },
  });

  return (
    <form
      className='flex flex-col w-full h-full gap-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex w-full h-full gap-2'>
        <Controller
          control={control}
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
                <>
                  <Button
                    className={clsx(
                      'justify-center w-8 h-full hidden',
                      field.value && '!flex',
                    )}
                    onClick={() => reset()}
                  >
                    <AddIcon className='w-3 h-3 rotate-45' />
                  </Button>
                  <Button
                    className={clsx(
                      'justify-center w-9 shrink-0 text-white bg-violet-600 rounded-none',
                      formState.isSubmitting && 'animate-pulse',
                    )}
                    disabled={!formState.isValid}
                    type='submit'
                  >
                    <SearchIcon className='w-5 h-5' />
                  </Button>
                </>
              }
              before={closeButton}
            />
          )}
        />
      </div>
      {errors.label && <Form.ErrorFeedback message={errors.label.message} />}
    </form>
  );
};

export const SearchListOfTodosForm = reflect({
  view: SearchListOfTodosFormView,
  bind: {
    onSubmit: effects.searchListOfTodosFx,
  },
});
