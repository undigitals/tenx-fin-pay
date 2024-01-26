export const getArraysIntersection = (arr1: any[], arr2: any[]) => {
  let checkArr = arr1;
  let baseArr = arr2;

  if (arr2.length <= arr1.length) {
    checkArr = arr2;
    baseArr = arr1;
  }
  return checkArr.filter((val: any) => baseArr.includes(val));
};

export const isFullIntersection = (arr1: any[], arr2: any[]) => {
  if (arr2.length !== arr1.length) {
    return false;
  }

  return arr1.every((val: any) => arr2.includes(val));
};
