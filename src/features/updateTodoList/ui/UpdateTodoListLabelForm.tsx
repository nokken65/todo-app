import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { UpdateTodoListInputs } from '~/entities/TodoList';
import { Button } from '~/shared/components';
import { EditIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { TodoList } from '~/shared/types';

import { effects } from '../model';
import { updateTodoListLabelSchema } from '../validation';

type UpdateTodoListLabelFormProps = Pick<TodoList, 'id' | 'label'> & {
  onSubmit: (props: Pick<UpdateTodoListInputs, 'label' | 'id'>) => void;
  onBlur: () => void;
};

const UpdateTodoListLabelFormView = ({
  id,
  label,
  onSubmit,
  onBlur,
}: UpdateTodoListLabelFormProps) => {
  const methods = useForm<Pick<UpdateTodoListInputs, 'label'>>({
    mode: 'onChange',
    resolver: yupResolver(updateTodoListLabelSchema),
    defaultValues: { label },
  });

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
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
      <Form.Field
        autoFocus
        before={
          <Button
            htmlType='submit'
            icon={<EditIcon className='w-5 h-5' />}
            isLoading={methods.formState.isSubmitting}
            rounded={false}
          />
        }
        className='!h-10 max-w-md '
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
    onSubmit: effects.updateTodoListLabelFx,
  },
});
