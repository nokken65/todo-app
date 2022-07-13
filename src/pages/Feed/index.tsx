import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DateCurrent, DateGrindsHeading } from '~/entities/Date/ui';
import { AddTodoList } from '~/features/addTodoList/';
import { SearchBreadcrumbs, SearchTodoList } from '~/features/filterTodoList';
import { DatePicker } from '~/features/pickDate';
import { Heading } from '~/shared/components';
import { Header } from '~/widgets/Header';
import { ProgressTodoCompletion } from '~/widgets/ProgressTodoCompletion';

const FeedRoute = () => {
  return (
    <div className='flex flex-col h-full min-h-screen gap-6 p-6'>
      <Header />

      <main className='flex flex-col h-full gap-6 grow'>
        <DateCurrent />

        <Heading className='!text-4xl lg:flex-col lg:flex' type='h2'>
          The Grind includes <DateGrindsHeading />
        </Heading>

        <ProgressTodoCompletion />

        <DatePicker />

        <div className='flex w-full h-10 gap-2'>
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
