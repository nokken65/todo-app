import { reflect } from '@effector/reflect';

import {
  SearchListOfTodosForm,
  searchListOfTodosModel,
} from '~/features/searchListOfTodos';
import { Button } from '~/shared/components';
import { ArrowIcon, SearchIcon } from '~/shared/icons';

type SearchListOfTodosProps = {
  isSearch: boolean;
  changeSearchState: () => void;
};

const SearchListOfTodosView = ({
  isSearch,
  changeSearchState,
}: SearchListOfTodosProps) => {
  return isSearch ? (
    <SearchListOfTodosForm
      closeButton={
        <Button
          className='justify-center h-full w-9 shrink-0 fill-white bg-violet'
          onClick={changeSearchState}
        >
          <ArrowIcon className='w-4 h-4' direction='left' />
        </Button>
      }
    />
  ) : (
    <Button
      className='justify-center h-10 font-bold text-white rounded-lg bg-violet-600 shrink-0 grow-0 basis-10'
      onClick={changeSearchState}
    >
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
