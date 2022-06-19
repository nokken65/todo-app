export const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date);

  result.setDate(date.getDate() + amount);

  return result;
};
