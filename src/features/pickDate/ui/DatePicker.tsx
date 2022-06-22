import { reflect } from '@effector/reflect';
import { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { DateCard, dateModel } from '~/entities/Date';
import type { DateString } from '~/shared/types';
import { scrollIntoView } from '~/shared/utils';

import { selectors } from '../model';

type DatePickerProps = {
  dateRange: DateString[];
  selectedDate: DateString;
  currentDate: DateString;
  selectDate: (date: DateString) => void;
};

const DatePickerView = ({
  dateRange,
  selectedDate,
  currentDate,
  selectDate,
}: DatePickerProps) => {
  // initial scroll
  const wrapperRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      scrollIntoView(focusRef);
    }
  }, [wrapperRef.current?.childElementCount]);

  useEffect(() => {
    scrollIntoView(focusRef);
  }, [selectedDate]);

  return (
    <div className='flex w-full gap-2'>
      {selectedDate !== currentDate && (
        <>
          <DateCard
            isCurrent
            date={currentDate}
            onClick={() => selectDate(currentDate)}
          />
          <span className='flex w-1 bg-gray-200' />
        </>
      )}
      <ScrollContainer
        hideScrollbars
        horizontal
        nativeMobileScroll
        className='flex gap-2'
        innerRef={wrapperRef}
        vertical={false}
      >
        {dateRange.map((date) => (
          <div key={date} ref={date === selectedDate ? focusRef : null}>
            <DateCard
              date={date}
              isCurrent={date === currentDate}
              isSelected={date === selectedDate}
              onClick={() => selectDate(date)}
            />
          </div>
        ))}
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
  },
});
