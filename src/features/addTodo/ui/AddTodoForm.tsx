import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

import { Button } from '~/shared/components';
import { AddIcon, CloseIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';
import { Todo } from '~/shared/types';

import { events } from '../model';
import { addTodoSchema } from '../validation';

type AddTodoFormProps = {
  listId: string;
  onSubmit: (props: { todos: Pick<Todo, 'text'>[]; listId: string }) => void;
  onBlur: () => void;
};

const AddTodoFormView = ({ listId, onSubmit, onBlur }: AddTodoFormProps) => {
  const methods = useForm<{ todos: Pick<Todo, 'text'>[] }>({
    mode: 'onBlur',
    resolver: yupResolver(addTodoSchema),
    defaultValues: { todos: [{ text: '' }] },
  });

  const { fields, append, remove } = useFieldArray<{
    todos: Pick<Todo, 'text'>[];
  }>({
    name: 'todos',
    control: methods.control,
  });

  const appendField = () => {
    append({ text: '' });
  };

  const removeField = (index: number) => {
    if (fields.length === 1 && index === 0) {
      onBlur();
    }
    remove(index);
  };

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
      className='flex-col max-w-md gap-2'
      onSubmit={(data) => {
        onSubmit({ ...data, listId });
        onBlur();
      }}
    >
      {fields.map((field, i) => (
        <div className='flex w-full gap-2' key={field.id}>
          <Form.Field
            autoFocus
            before={
              <span className='flex items-center justify-center w-6 text-sm text-gray-400'>
                {i + 1}
              </span>
            }
            className='h-10'
            enterKeyHint='next'
            name={`todos.${i}.text`}
            placeholder='buy a milk'
            type='text'
          />
          <Button type='ghost' onClick={() => removeField(i)}>
            <CloseIcon className='w-4 h-4' />
          </Button>
        </div>
      ))}

      {fields.length < 20 && (
        <Button
          className='h-10'
          icon={<AddIcon className='w-4 h-4' />}
          type='ghost'
          onClick={() => appendField()}
        />
      )}
      <Button
        className='h-10'
        htmlType='submit'
        icon={<AddIcon className='w-4 h-4' />}
        isLoading={methods.formState.isSubmitting}
      >
        Add todos
      </Button>
    </Form>
  );
};

export const AddTodoForm = reflect({
  view: AddTodoFormView,
  bind: {
    onSubmit: events.addTodo,
  },
});
