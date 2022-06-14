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
    <div className='flex items-start gap-2'>
      <Button
        className='justify-center w-10 h-10 fill-white bg-violet'
        onClick={changeEditState}
      >
        <ArrowIcon className='w-4 h-4' direction='left' />
      </Button>
      <AddListOfTodosForm />
    </div>
  ) : (
    <Button
      className='justify-center h-10 font-bold text-white bg-violet-600'
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
