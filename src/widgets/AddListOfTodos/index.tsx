import { reflect } from '@effector/reflect';

import { addListOfTodosModel } from '~/features/addListOfTodos';
import { AddListOfTodosForm } from '~/features/addListOfTodos/ui';
import { Button } from '~/shared/components';
import { AddIcon } from '~/shared/icons';

type AddListOfTodosProps = {
  isEdit: boolean;
  changeEditState: () => void;
};

const AddListOfTodosView = ({
  isEdit,
  changeEditState,
}: AddListOfTodosProps) => {
  return isEdit ? (
    <AddListOfTodosForm />
  ) : (
    <Button bordered className='grow' onClick={changeEditState}>
      <AddIcon className='w-4 h-4' />
    </Button>
  );
};

export const AddListOfTodos = reflect({
  view: AddListOfTodosView,
  bind: {
    isEdit: addListOfTodosModel.selectors.$isEdit,
    changeEditState: addListOfTodosModel.events.changeEditState,
  },
});
