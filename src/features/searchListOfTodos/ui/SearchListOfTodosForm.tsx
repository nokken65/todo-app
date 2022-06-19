import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '~/shared/components';
import { SearchIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { TodoList } from '~/shared/types';

import { effects, events } from '../model';
import { searchListOfTodosSchema } from '../validation';

type SearchListOfTodosFormProps = {
  onSubmit: (props: Pick<TodoList, 'label'>) => void;
  onBlur: () => void;
};

const SearchListOfTodosFormView = ({
  onSubmit,
  onBlur,
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
    <Form {...methods} onBlur={onBlur} onSubmit={onSubmit}>
      <Form.Field
        autoFocus
        after={
          <Button
            htmlType='submit'
            icon={<SearchIcon className='w-5 h-5' />}
            isLoading={isSubmitting}
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

export const SearchListOfTodosForm = reflect({
  view: SearchListOfTodosFormView,
  bind: {
    onSubmit: effects.searchListOfTodosFx,
    onBlur: events.changeSearchState,
  },
});
