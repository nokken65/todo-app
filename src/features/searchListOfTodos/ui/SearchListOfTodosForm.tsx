import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { ButtonWithLoader } from '~/shared/components';
import { SearchIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
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
  const methods = useForm<Pick<TodoList, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(searchListOfTodosSchema),
    defaultValues: { label: '' },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Form.Field
        after={
          <ButtonWithLoader
            className='justify-center min-w-[36px] font-bold text-white bg-violet-600'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type='submit'
          >
            <SearchIcon className='w-5 h-5' />
          </ButtonWithLoader>
        }
        before={closeButton}
        name='label'
        type='search'
      />
    </Form>
  );
};

export const SearchListOfTodosForm = reflect({
  view: SearchListOfTodosFormView,
  bind: {
    onSubmit: effects.searchListOfTodosFx,
  },
});
