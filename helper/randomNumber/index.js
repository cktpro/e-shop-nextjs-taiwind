function randomTenDigits() {
  let result = "";
  for (let i = 0; i < 10; i += 1) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

export { randomTenDigits };
