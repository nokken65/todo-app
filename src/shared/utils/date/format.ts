type FnFormatType = (
  date: Date,
  options?: Intl.DateTimeFormatOptions & { delimiter?: string },
) => string;

export const format: FnFormatType = (
  date,
  options = {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
  },
): string => {
  const arr = date.toLocaleDateString('en-US', options).split('/');

  const result = [arr.splice(-1), ...arr].join(options?.delimiter ?? '-');

  return result;
};
