import { reflect } from '@effector/reflect';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Typography } from '~/shared/components';
import { CloseIcon } from '~/shared/icons';
import { TodoList } from '~/shared/types';

import { searchFilter, selectors } from '../model';

type SearchBreadcrumbsProps = {
  searchQuery: Pick<TodoList, 'label'>;
  countResults: number;
  resetSearchFilter: () => void;
};

const SearchBreadcrumbsView = ({
  searchQuery,
  countResults,
  resetSearchFilter,
}: SearchBreadcrumbsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const resetSearch = useCallback(() => {
    searchParams.delete('q');
    setSearchParams(searchParams);
    resetSearchFilter();
  }, [resetSearchFilter, searchParams, setSearchParams]);

  return searchQuery.label ? (
    <div className='flex gap-1 items-center h-10'>
      <Button
        className='text-gray-400'
        type='ghost'
        onClick={() => resetSearch()}
      >
        <CloseIcon className='w-4 h-4' />
      </Button>
      <Typography className='text-gray-400'>
        {`${countResults} results found for the query: "${searchQuery.label}"`}
      </Typography>
    </div>
  ) : null;
};

export const SearchBreadcrumbs = reflect({
  view: SearchBreadcrumbsView,
  bind: {
    searchQuery: searchFilter.$searchQuery,
    countResults: selectors.$filteredTodoListsCount,
    resetSearchFilter: searchFilter.resetSearchFilter,
  },
});
