import { Outlet } from 'react-router-dom';

import { DateGrindsHeading } from '~/entities/Date/ui';
import { DatePicker } from '~/features/pickDate';
import { DateTime, Heading, Progress } from '~/shared/components';
import { AddListOfTodos } from '~/widgets/AddListOfTodos';
import { Header } from '~/widgets/Header';
import { SearchListOfTodos } from '~/widgets/SearchListOfTodos';

const FeedRoute = () => {
  return (
    <div className='flex flex-col h-full min-h-screen gap-6 p-6'>
      <Header />
      <main className='flex flex-col h-full gap-6 grow'>
        <DateTime.CutrrentDate />
        <Heading>
          The Grind includes <DateGrindsHeading />
        </Heading>
        <Progress value={70} />

        <DatePicker />

        <div className='flex w-full gap-2'>
          <AddListOfTodos />
          <SearchListOfTodos />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default FeedRoute;
