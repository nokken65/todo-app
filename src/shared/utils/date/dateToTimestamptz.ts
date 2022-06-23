import format from 'date-fns/format';

export const dateToTimestamptz = (date: Date): string => {
  return `${format(date, 'yyyy-MM-dd HH:mm:ss')}.${format(date, 'T').slice(
    0,
    6,
  )}${format(date, 'x')}`;
};
