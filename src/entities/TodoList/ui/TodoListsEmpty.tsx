import { memo } from 'react';

import { Typography } from '~/shared/components';
import { OpenedBoxIcon } from '~/shared/icons';

const TodoListsEmptyView = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-4 grow'>
      <Typography bold className='text-center' size='xl'>
        Not found any todo lists
      </Typography>
      <OpenedBoxIcon className='w-20 h-20 text-violet-600' />
    </div>
  );
};

export const TodoListsEmpty = memo(TodoListsEmptyView);
