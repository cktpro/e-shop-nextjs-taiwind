const getTime = (date) => {
  const now = new Date();

  const endDate = new Date(date);

  const daysUntilEndDate = Math.floor(endDate - now) / 1000;

  if (daysUntilEndDate < 0) {
    return 0;
  }

  return parseInt(daysUntilEndDate, 10);
};

export { getTime };
