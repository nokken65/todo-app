import { reflect } from '@effector/reflect';
import { compareAsc } from 'date-fns';
import { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { DateCard, dateModel } from '~/entities/Date';
import { scrollIntoView } from '~/shared/utils';

import { events, selectors } from '../model';

type DatePickerProps = {
  dateRange: string[];
  selectedDate: string;
  currentDate: string;
  selectedIsCurrent: boolean;
  selectDate: (date: string) => void;
};

const DatePickerView = ({
  dateRange,
  selectedDate,
  currentDate,
  selectedIsCurrent,
  selectDate,
}: DatePickerProps) => {
  const focusRef = useRef<HTMLDivElement>(null);
  const fullSelectedDate = new Date(selectedDate);
  const fullCurrentDate = new Date(currentDate);

  useEffect(() => {
    scrollIntoView(focusRef);
  }, [selectedDate]);

  return (
    <div className='flex w-full gap-2'>
      {!selectedIsCurrent && (
        <div className='pr-2 border-r border-gray-pale'>
          <DateCard
            isCurrent
            date={currentDate}
            onClick={() => selectDate(currentDate)}
          />
        </div>
      )}
      <ScrollContainer
        hideScrollbars
        horizontal
        nativeMobileScroll
        className='flex gap-2'
        vertical={false}
      >
        {dateRange.map((date) => {
          const fullDate = new Date(date);

          const isSelected = compareAsc(fullDate, fullSelectedDate) === 0;
          const isCurrent = compareAsc(fullDate, fullCurrentDate) === 0;

          return (
            <div
              key={fullDate.toISOString()}
              ref={isSelected ? focusRef : null}
            >
              <DateCard
                date={date}
                isCurrent={isCurrent}
                isSelected={isSelected}
                onClick={() => selectDate(date)}
              />
            </div>
          );
        })}
      </ScrollContainer>
    </div>
  );
};

export const DatePicker = reflect({
  view: DatePickerView,
  bind: {
    dateRange: selectors.$dateRange,
    selectedDate: dateModel.selectors.$selectedDate,
    currentDate: dateModel.selectors.$currentDate,
    selectDate: dateModel.events.selectDate,
    selectedIsCurrent: dateModel.selectors.$selectedDateIsCurrent,
  },
  hooks: {
    mounted: () =>
      events.updateDateRange(dateModel.selectors.$selectedDate.getState()),
  },
});
