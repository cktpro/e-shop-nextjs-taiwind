const getTime = (date) => {
  const now = new Date();

  const endDate = new Date(date);

  endDate.setHours(23, 59, 59, 0);

  const daysUntilEndDate = Math.floor(endDate - now) / 1000;

  if (daysUntilEndDate < 0) {
    return 0;
  }

  return parseInt(daysUntilEndDate, 10);
};

export { getTime };
