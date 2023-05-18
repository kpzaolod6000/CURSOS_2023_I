const getInter = (x1, ratingsX1, x2, ratingsX2) => {
  const intersection = x1?.filter((element) => x2?.includes(element));

  console.log("intersectio ", intersection);
  const result = intersection.reduce((accumulator, currentValue) => {
    const idxX1 = x1?.findIndex((elem) => elem === currentValue);
    const idxX2 = x2?.findIndex((elem) => elem === currentValue);
    const valueRatingsX1 = ratingsX1[idxX1];
    const valueRatingsX2 = ratingsX2[idxX2];

    console.log("OPERACIONES");
    console.log("index: ", idxX1);
    console.log("value: ", valueRatingsX1);

    console.log("index: ", idxX2);
    console.log("value: ", valueRatingsX2);

    console.log("RESTA ABS", Math.abs(valueRatingsX1 - valueRatingsX2));

    accumulator += Math.abs(valueRatingsX1 - valueRatingsX2);
    return accumulator;
  }, 0);

  return result;
};

console.log(
  getInter(
    [
      122, 185, 231, 292, 316, 329, 355, 356, 362, 364, 370, 377, 420, 466, 480,
      520, 539, 586, 588, 589, 594, 616
    ],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [
      21, 34, 39, 110, 150, 153, 161, 165, 208, 231, 253, 266, 292, 316, 317,
      329, 344, 349, 364, 367, 377, 380, 410, 420, 432, 434, 435, 440, 480, 500,
      586, 587, 588, 589, 590, 592, 595, 597
    ],
    [
      3, 5, 3, 5, 5, 5, 5, 5, 3, 1, 3, 5, 3, 5, 5, 5, 2, 3, 5, 3, 3, 3, 5, 3, 3,
      3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3
    ]
  )
);

