export const objectSize = (obj) => {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export const currencyIdrConverter = (
  price,
  decPlaces,
  thouSeparator,
  decSeparator
) => {
  var n = price,
    decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt((n = Math.abs(+n || 0).toFixed(decPlaces))) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    sign +
    (j ? i.substr(0, j) + thouSeparator : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) +
    (decPlaces
      ? decSeparator +
        Math.abs(n - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
};