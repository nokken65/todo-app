import { reflect } from '@effector/reflect';

import { Button } from '~/shared/components';
import { SearchIcon } from '~/shared/icons';

import { searchFormState } from '../model';
import { SearchTodoListForm } from './SearchTodoListForm';

type SearchTodoListProps = {
  isOpen: boolean;
  openForm: () => void;
};

const SearchTodoListView = ({ isOpen, openForm }: SearchTodoListProps) => {
  return isOpen ? (
    <SearchTodoListForm />
  ) : (
    <Button bordered onClick={openForm}>
      <SearchIcon className='w-5 h-5' />
    </Button>
  );
};

export const SearchTodoList = reflect({
  view: SearchTodoListView,
  bind: {
    isOpen: searchFormState.$isOpen,
    openForm: searchFormState.open,
  },
});
