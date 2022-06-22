import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { AddTodoListInputs } from '~/entities/TodoList';
import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';

import { effects, formState } from '../model';
import { addTodoListSchema } from '../validation';

type AddTodoListFormProps = {
  onSubmit: (props: Pick<AddTodoListInputs, 'label'>) => void;
  onBlur: () => void;
};

const AddTodoListFormView = ({ onSubmit, onBlur }: AddTodoListFormProps) => {
  const methods = useForm<Pick<AddTodoListInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(addTodoListSchema),
    defaultValues: { label: '' },
  });

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
      onBlur={onBlur}
      onSubmit={async (data) => {
        await onSubmit(data);
        onBlur();
      }}
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

export const AddTodoListForm = reflect({
  view: AddTodoListFormView,
  bind: {
    onSubmit: effects.addTodoListFx,
    onBlur: formState.close,
  },
});
