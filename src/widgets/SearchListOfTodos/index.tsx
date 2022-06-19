import { reflect } from '@effector/reflect';

import {
  SearchListOfTodosForm,
  searchListOfTodosModel,
} from '~/features/searchListOfTodos';
import { Button } from '~/shared/components';
import { SearchIcon } from '~/shared/icons';

type SearchListOfTodosProps = {
  isSearch: boolean;
  changeSearchState: () => void;
};

const SearchListOfTodosView = ({
  isSearch,
  changeSearchState,
}: SearchListOfTodosProps) => {
  return isSearch ? (
    <SearchListOfTodosForm />
  ) : (
    <Button bordered onClick={changeSearchState}>
      <SearchIcon className='w-5 h-5' />
    </Button>
  );
};

export const SearchListOfTodos = reflect({
  view: SearchListOfTodosView,
  bind: {
    isSearch: searchListOfTodosModel.selectors.$isSearch,
    changeSearchState: searchListOfTodosModel.events.changeSearchState,
  },
});
