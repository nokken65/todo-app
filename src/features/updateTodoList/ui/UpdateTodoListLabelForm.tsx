import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '~/shared/components';
import { EditIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { TodoList } from '~/shared/types';

import { events } from '../model';
import { updateTodoListLabelSchema } from '../validation';

type UpdateTodoListLabelFormProps = Pick<TodoList, 'id' | 'label'> & {
  onSubmit: (props: Pick<TodoList, 'label' | 'id'>) => void;
  onBlur: () => void;
};

const UpdateTodoListLabelFormView = ({
  id,
  label,
  onSubmit,
  onBlur,
}: UpdateTodoListLabelFormProps) => {
  const methods = useForm<Pick<TodoList, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(updateTodoListLabelSchema),
    defaultValues: { label },
  });

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
      className='max-w-md '
      onBlur={onBlur}
      onSubmit={(data) => {
        if (data.label === label || !data.label) {
          onBlur();
        } else {
          onSubmit({ ...data, id });
          onBlur();
        }
      }}
    >
      <Button
        className='rounded-tr-none rounded-br-none'
        htmlType='submit'
        icon={<EditIcon className='w-5 h-5' />}
        isLoading={methods.formState.isSubmitting}
      />
      <Form.Field
        autoFocus
        className='h-10 rounded-tl-none rounded-bl-none'
        name='label'
        placeholder='At work'
        type='text'
      />
    </Form>
  );
};

export const UpdateTodoListLabelForm = reflect({
  view: UpdateTodoListLabelFormView,
  bind: {
    onSubmit: events.updateTodoListLabel,
  },
});
