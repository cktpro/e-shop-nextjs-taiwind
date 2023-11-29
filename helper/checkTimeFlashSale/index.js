const checkTime = (date) => {
  const now = new Date();

  const endDate = new Date(date);

  const daysUntilEndDate = Math.floor(endDate - now) / 1000;

  return parseInt(daysUntilEndDate, 10);
};

export { checkTime };
