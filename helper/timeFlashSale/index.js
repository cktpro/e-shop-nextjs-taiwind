const formatTime = (seconds) => {
  const day = Math.floor(seconds / 86400);
  const hour = Math.floor((seconds % 86400) / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;
  const dateTime = {
    day,
    hour,
    minute,
    second,
  };

  return dateTime;
};

const formatNumberToString = (number) => {
  let string;
  if (number < 10) {
    string = `0${number.toString()}`;
  } else {
    string = number.toString();
  }

  return string;
};

export { formatTime, formatNumberToString };
