export const randomArray = (n, v) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * v) + 1;
  }
  return arr;
};

export const copyArray = arr => {
  return [...arr];
};
export const sameArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

//通用的对数器，使用时通过validator传入具体的验证方法
export const logarithmicValidator = (
  arrayLength,
  arrayRange,
  testTimes,
  validator
) => {
  const N = arrayLength;
  const V = arrayRange;
  //   const testTimes = testTimes;
  console.log('==========测试开始==========');
  for (let i = 0; i < testTimes; i++) {
    let n = Math.floor(Math.random() * N);
    let arr = randomArray(n, V);
    try {
      validator(arr, V);
    } catch (err) {
      console.error(err);
    }
  }
  console.log('==========测试结束==========');
};
