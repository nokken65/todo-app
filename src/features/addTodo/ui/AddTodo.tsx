import { reflect } from '@effector/reflect';
import { useStoreMap } from 'effector-react';

import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

import { formState } from '../model';
import { AddTodoForm } from './AddTodoForm';

type AddTodoProps = {
  listId: string;
  openForm: (id: string) => void;
  closeForm: (id: string) => void;
};

const AddTodoView = ({ listId, openForm, closeForm }: AddTodoProps) => {
  const isOpenForm = useStoreMap({
    store: formState.$isOpen,
    keys: [listId],
    fn: (state, [id]) => state[id],
  });

  return (
    <div className='flex w-full'>
      {isOpenForm ? (
        <AddTodoForm listId={listId} onBlur={() => closeForm(listId)} />
      ) : (
        <Button className='w-10 h-10 ml-auto' onClick={() => openForm(listId)}>
          <AddIcon className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};

export const AddTodo = reflect({
  view: AddTodoView,
  bind: {
    openForm: formState.open,
    closeForm: formState.close,
  },
});
