import { reflect } from '@effector/reflect';

import { todoListModel } from '~/entities/TodoList';
import { Button, Typography } from '~/shared/components';
import { CloseIcon } from '~/shared/icons';
import { TodoList } from '~/shared/types';

import { events, selectors } from '../model';

type SearchBreadcrumbsProps = {
  searchQuery: Pick<TodoList, 'label'>;
  countResults: number;
  resetSearchQuery: () => void;
};

const SearchBreadcrumbsView = ({
  searchQuery,
  countResults,
  resetSearchQuery,
}: SearchBreadcrumbsProps) => {
  return searchQuery.label ? (
    <div className='flex gap-1 items-center h-10'>
      <Button className='text-gray-400' type='ghost' onClick={resetSearchQuery}>
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
    searchQuery: selectors.$searchQuery,
    countResults: todoListModel.selectors.$todoListsCount,
    resetSearchQuery: events.resetSearchQuery,
  },
});
