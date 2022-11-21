export const formatNumberFunc = (value: any) => {
  if (!value) {
    return value;
  }

  const numberValue = parseFloat(value);
  if (!numberValue) {
    return value;
  }

  return `${numberValue.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};
