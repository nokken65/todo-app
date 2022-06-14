import { format } from 'date-fns';

export const timestampToDate = (timestamp: Date): string =>
  format(timestamp, 'MM/dd/yyyy');
