import { format } from 'date-fns';

// "MM/dd/yyyy" -> "yyyy-mm-dd"
export const convertDateStringToPostgresStyle = (date: string) =>
  format(new Date(date), 'yyyy-MM-dd');
