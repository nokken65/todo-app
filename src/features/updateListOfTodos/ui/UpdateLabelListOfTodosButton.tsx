import { reflect } from '@effector/reflect';

import { UpdateListOfTodosInputs } from '~/entities/ListOfTodos';
import { Button } from '~/shared/components';

import { events } from '../model';

type UpdateLabelListOfTodosButtonProps = Pick<UpdateListOfTodosInputs, 'id'> & {
  onEditLabel: (props: Pick<UpdateListOfTodosInputs, 'id'>) => void;
};

const UpdateLabelListOfTodosButtonView = ({
  id,
  onEditLabel,
}: UpdateLabelListOfTodosButtonProps) => {
  return (
    <Button
      className='p-3 font-bold text-gray-700 rounded-none hover:bg-yellow-100 hover:brightness-100'
      onClick={() => onEditLabel({ id })}
    >
      Edit
    </Button>
  );
};

export const UpdateLabelListOfTodosButton = reflect({
  view: UpdateLabelListOfTodosButtonView,
  bind: {
    onEditLabel: events.setListOfTodosBeingUpdated,
  },
});
