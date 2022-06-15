import { reflect } from '@effector/reflect';

import { addListOfTodosModel } from '~/features/addListOfTodos';
import { AddListOfTodosForm } from '~/features/addListOfTodos/ui';
import { Button } from '~/shared/components';
import { AddIcon, ArrowIcon } from '~/shared/icons';

type AddListOfTodosProps = {
  isEdit: boolean;
  changeEditState: () => void;
};

const AddListOfTodosView = ({
  isEdit,
  changeEditState,
}: AddListOfTodosProps) => {
  return isEdit ? (
    <AddListOfTodosForm
      closeButton={
        <Button
          className='justify-center w-10 h-full fill-white bg-violet'
          onClick={changeEditState}
        >
          <ArrowIcon className='w-4 h-4' direction='left' />
        </Button>
      }
    />
  ) : (
    <Button
      className='justify-center w-full h-10 font-bold text-white rounded-lg bg-violet-600'
      onClick={changeEditState}
    >
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
