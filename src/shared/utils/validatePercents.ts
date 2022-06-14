const validatePercents = (value: number) => {
  if (value > 100) {
    return 100;
  }
  if (value < 0) {
    return 0;
  }

  return value;
};

export { validatePercents };
