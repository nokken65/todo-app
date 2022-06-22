import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DateCurrent, DateGrindsHeading } from '~/entities/Date/ui';
import { DatePicker } from '~/features/pickDate';
import { SearchBreadcrumbs } from '~/features/searchTodoList';
import { Heading, Progress } from '~/shared/components';
import { AddTodoList } from '~/widgets/AddTodoList';
import { Header } from '~/widgets/Header';
import { SearchTodoList } from '~/widgets/SearchTodoList';

const FeedRoute = () => {
  return (
    <div className='flex flex-col h-full min-h-screen gap-6 p-6'>
      <Header />
      <main className='flex flex-col h-full gap-6 grow'>
        <DateCurrent />
        <Heading className='!text-4xl lg:flex-col lg:flex' type='h2'>
          The Grind includes <DateGrindsHeading />
        </Heading>
        <Progress value={70} />

        <DatePicker />

        <div className='flex w-full gap-2'>
          <AddTodoList />
          <SearchTodoList />
        </div>
        <SearchBreadcrumbs />
        <Suspense fallback=''>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default FeedRoute;
