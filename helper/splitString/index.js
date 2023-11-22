function splitString(string) {
  let fullNewString = {};
  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  const newString = string.trim();

  // Tìm vị trí của khoảng trắng cuối cùng
  const indexOfLastSpace = newString.lastIndexOf(" ");

  // Kiểm tra xem có khoảng trắng cuối cùng không
  if (indexOfLastSpace !== -1) {
    // Cắt chuỗi thành 2 phần: từ đầu đến khoảng trắng cuối cùng và từ khoảng trắng cuối cùng đến hết chuỗi
    const firstString = newString.slice(0, indexOfLastSpace);
    const lastString = newString.slice(indexOfLastSpace + 1);

    fullNewString = { firstString, lastString };

    return fullNewString;
  }
  fullNewString = { newString };

  return fullNewString;
}

export { splitString };
