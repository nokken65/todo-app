import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Button } from '~/shared/components';
import { SearchIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { TodoList } from '~/shared/types';

import { effects, formState, selectors } from '../model';
import { searchTodoListSchema } from '../validation';

type SearchTodoListFormProps = {
  searchQuery: Pick<TodoList, 'label'>;
  onSubmit: (props: Pick<TodoList, 'label'>) => void;
  onBlur: () => void;
};

const SearchTodoListFormView = ({
  searchQuery,
  onSubmit,
  onBlur,
}: SearchTodoListFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm<Pick<TodoList, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(searchTodoListSchema),
    defaultValues: { label: searchQuery.label },
  });

  return (
    <Form
      {...methods}
      onBlur={onBlur}
      onSubmit={(data) => {
        if (data.label.length === 0) {
          searchParams.delete('q');
          setSearchParams(searchParams);
        } else {
          setSearchParams({ q: data.label });
        }
        onSubmit(data);
      }}
    >
      <Form.Field
        autoFocus
        after={
          <Button
            htmlType='submit'
            icon={<SearchIcon className='w-5 h-5' />}
            isLoading={methods.formState.isSubmitting}
            rounded={false}
          />
        }
        name='label'
        placeholder='At work'
        type='search'
      />
    </Form>
  );
};

export const SearchTodoListForm = reflect({
  view: SearchTodoListFormView,
  bind: {
    searchQuery: selectors.$searchQuery,
    onSubmit: effects.searchTodoListFx,
    onBlur: formState.close,
  },
});
