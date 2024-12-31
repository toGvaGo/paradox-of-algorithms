const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

// 选择排序

function selectionSort(arr) {
  if (arr === null || arr.length < 2) return arr;

  const n = arr.length;
  for (let minIndex, i = 0; i < n; i++) {
    minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
}

//冒泡排序
function bubbleSort(arr) {
  if (arr === null || arr.length < 2) return arr;

  const n = arr.length;
  for (let end = n - 1; end >= 0; end--) {
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
  }
}

//插入排序
function insertionSort(arr) {
  if (arr === null || arr.length < 2) return arr;
  const n = arr.length;
  //i相当于右边界
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1);
    }
  }
}

//生成长度为n的随机数组
const randomArray = (n, v) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    // Math.random()等概率返回[0,1)范围上的一个小数
    // Math.random() * v等概率返回[0,v)范围上的一个小数
    // Math.floor(Math.random() * v) + 1等概率返回[1,v]范围上的一个整数
    arr[i] = Math.floor(Math.random() * v) + 1;
  }
  return arr;
};
//用于验证
const copyArray = arr => {
  // 比较直接的es6写法
  return [...arr];
  // 左神java代码转js
  const n = arr.length;
  let ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = arr[i];
  }
  return ans;
};
const sameArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

function main() {
  const N = 100;
  const V = 1000;
  const testTimes = 5000;
  console.log('===测试开始===');
  for (let i = 0; i < testTimes; i++) {
    let n = Math.floor(Math.random() * N);
    let arr = randomArray(n, V);
    let arr1 = copyArray(arr);
    let arr2 = copyArray(arr);
    let arr3 = copyArray(arr);
    selectionSort(arr1);
    bubbleSort(arr2);
    insertionSort(arr3);
    if (!sameArray(arr1, arr2) || !sameArray(arr2, arr3)) {
      console.log('----出错了----');
    }
  }
  console.log('===测试结束===');
}
main();
