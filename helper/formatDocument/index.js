const formattedMoney = (number) => `$${Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(number)}`;

const formattedDiscount = (number) => `-${parseInt(number, 10)}%`;

const formattedDiscountPrice = (price, discount) => {
  if (price && discount) {
    const discountedPrice = (price * (100 - discount)) / 100;
    return formattedMoney(discountedPrice);
  }
  return formattedMoney(0);
};

export { formattedMoney, formattedDiscount, formattedDiscountPrice };
