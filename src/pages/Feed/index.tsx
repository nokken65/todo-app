import { DatePicker } from '~/features/pickDate';
import { DateTime, Heading, ProgressBar } from '~/shared/components';
import { AddListOfTodos } from '~/widgets/AddListOfTodos';
import { Header } from '~/widgets/Header';
import { ListOfTodosFeed } from '~/widgets/ListOfTodosFeed';
import { SearchListOfTodos } from '~/widgets/SearchListOfTodos';

const FeedRoute = () => {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <Header />
      <main className='flex flex-col gap-6'>
        <div className='flex flex-col items-start gap-3'>
          <Heading>
            The Grind includes <DateTime.CutrrentWeek />
          </Heading>
        </div>
        <ProgressBar value={70} />

        <DatePicker />

        <div className='flex w-full gap-2'>
          <AddListOfTodos />
          <SearchListOfTodos />
        </div>

        <ListOfTodosFeed />
      </main>
    </div>
  );
};

export default FeedRoute;
