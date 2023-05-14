const Manhattan = (x1, x2) => {
  const { user_id: user_idX1, item_id: item_idX1, ratings: ratingsX1 } = x1;
  const { user_id: user_idX2, item_id: item_idX2, ratings: ratingsX2 } = x2;

  const intersection = item_idX1?.filter((element) =>
    item_idX2?.includes(element)
  );

  //verificar si la interseccion solo contiene un valor

  if (intersection) {
    const result = intersection.reduce((accumulator, currentValue) => {
      const idxX1 = item_idX1?.findIndex((elem) => elem === currentValue);
      const idxX2 = item_idX2?.findIndex((elem) => elem === currentValue);
      const valueRatingsX1 = ratingsX1[idxX1];
      const valueRatingsX2 = ratingsX2[idxX2];

      // console.log(valueRatingsX1);
      // console.log(valueRatingsX2);
      accumulator += Math.abs(valueRatingsX1 - valueRatingsX2);
      return accumulator;
    }, 0);
    return result;
  }

  console.log("sin interseccion");

  return NaN;
};

module.export = Manhattan;  