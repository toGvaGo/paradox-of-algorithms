// 对数器验证
import { logarithmicValidator } from '../test.js';
// const { logarithmicValidator } = require('../test.js');

// 暴力解法，保证没错
function baseExist(arr, num) {
  for (const n of arr) {
    if (n === num) {
      return true;
    }
  }
  return false;
}
//最基础的二分，需要保证arr是有序的
function exist(arr, num) {
  if (arr === null || arr.length === 0) return false;

  let l = 0;
  let r = arr.length - 1;
  let m = 0;
  while (l <= r) {
    m = l + ((r - l) >> 1);
    if (arr[m] > num) {
      r = m - 1;
    } else if (arr[m] < num) {
      l = m + 1;
    } else {
      return true;
    }
  }

  return false;
}
// logarithmicValidator(100, 1000, 500, (arr, V) => {
//   arr.sort((a, b) => a - b);
//   let num = Math.floor(Math.random() * V);
//   if (baseExist(arr, num) !== exist(arr, num)) {
//     console.log('----出错了----');
//   }
// });
// 寻找>=num的最左位置，<=num的最右位置同理
function baseFindLeft(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= num) {
      return i;
    }
  }
  return -1;
}
function findLeft(arr, num) {
  let l = 0;
  let r = arr.length - 1;
  let m = 0;
  let ans = -1;
  while (l <= r) {
    //需要保证r-l非负
    m = l + ((r - l) >> 1);
    if (arr[m] >= num) {
      ans = m;
      r = m - 1;
    } else {
      l = m + 1;
    }
  }
  return ans;
}
logarithmicValidator(100, 1000, 500, (arr, V) => {
  arr.sort((a, b) => a - b);
  let num = Math.floor(Math.random() * V);
  if (baseFindLeft(arr, num) !== findLeft(arr, num)) {
    console.log('----出错了----');
  }
});

// 峰值问题
// 返回无序数组中任意一个峰值的下标
// leetcode连接：https://leetcode.cn/problems/find-peak-element/description/
function findPeakElement(arr) {
  const n = arr.length;
  // 边缘case处理
  if (n === 1) return 0;
  if (arr[0] > arr[1]) return 0;
  if (arr[n - 1] > arr[n - 2]) return n - 1;

  // 左右两侧都不是峰值，往中间查找
  let l = 1;
  let r = n - 2;
  let m = 0;
  let ans = -1;
  while (l <= r) {
    m = l + ((r - l) >> 1);
    if (arr[m] < arr[m - 1]) {
      // 左边有峰值
      r = m - 1;
    } else if (arr[m] < arr[m + 1]) {
      // 右边有峰值
      l = m + 1;
    } else {
      // 这个else并没有进行相等的判断，因为题干中保证对于所有有效的 i 都有 nums[i] != nums[i + 1]，所以这个分支下的m一定是峰值
      ans = m;
      break;
    }
  }
  return ans;
}

/** 
 @description: 二分法通常用于“某侧必有”问题，不一定要在有序数组中。判断左侧或者右侧是否满足某个条件类的问题，就可以考虑用二分法解决
 */
