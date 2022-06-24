import { reflect } from '@effector/reflect';

import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

import { formState } from '../model';
import { AddTodoListForm } from './AddTodoListForm';

type AddTodoListProps = {
  isOpen: boolean;
  openForm: () => void;
};

const AddTodoListView = ({ isOpen, openForm }: AddTodoListProps) => {
  return isOpen ? (
    <AddTodoListForm />
  ) : (
    <Button bordered className='grow' onClick={openForm}>
      <AddIcon className='w-4 h-4' />
    </Button>
  );
};

export const AddTodoList = reflect({
  view: AddTodoListView,
  bind: {
    isOpen: formState.$isOpen,
    openForm: formState.open,
  },
});
