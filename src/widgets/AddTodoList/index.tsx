import { reflect } from '@effector/reflect';

import { addTodoListModel } from '~/features/addTodoList';
import { AddTodoListForm } from '~/features/addTodoList/ui';
import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

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
    isOpen: addTodoListModel.formState.$isOpen,
    openForm: addTodoListModel.formState.open,
  },
});
