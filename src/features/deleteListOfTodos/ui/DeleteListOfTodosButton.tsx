import { reflect } from '@effector/reflect';

import { DeleteListOfTodosInputs } from '~/entities/ListOfTodos';
import { Button } from '~/shared/components';

import { events } from '../model';

type DeleteListOfTodosButtonProps = DeleteListOfTodosInputs & {
  onDelete: (props: DeleteListOfTodosInputs) => void;
};

const DeleteListOfTodosButtonView = ({
  id,
  onDelete,
}: DeleteListOfTodosButtonProps) => {
  return (
    <Button
      className='p-3 font-bold text-red-600 rounded-none hover:bg-red-100 hover:brightness-100'
      onClick={() => onDelete({ id })}
    >
      Delete
    </Button>
  );
};

export const DeleteListOfTodosButton = reflect({
  view: DeleteListOfTodosButtonView,
  bind: {
    onDelete: events.deleteListOfTodos,
  },
});
