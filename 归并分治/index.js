// 归并排序
// leetcode链接：https://leetcode.cn/problems/sort-an-array/
// 递归版
function sortArray(nums) {
  let help = new Array(nums.length);
  function mergeSort(left, right) {
    if (left === right) {
      // 分到单个元素了，已然有序
      return;
    }
    // 防止溢出的一种写法，当然left和right作为数组下标，一般情况下是不会溢出的
    let mid = left + ((right - left) >> 1);
    // 分治左侧与右侧
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }
  function merge(left, mid, right) {
    let i = left;
    // 左侧的头
    let a = left;
    // 右侧的头
    let b = mid + 1;
    // 将小的元素放入help中，对应一侧的指针随之右移
    while (a <= mid && b <= right) {
      help[i++] = nums[a] < nums[b] ? nums[a++] : nums[b++];
    }
    // 要注意，虽然这里连着写了两个while，但其实是互斥的，最多只有一个while会执行
    while (a <= mid) {
      help[i++] = nums[a++];
    }
    while (b <= right) {
      help[i++] = nums[b++];
    }
    // help是已经排序好的结果，将其刷回原数组
    for (i = left; i <= right; i++) {
      nums[i] = help[i];
    }
  }

  mergeSort(0, nums.length - 1);
  return nums;
}
// 非递归版
function sortArray(nums) {
  let help = new Array(nums.length);
  function mergeSort(n) {
    // 这里写step*=2也可以，不过位运算会比算数运算快一些（当然前提要保证不会溢出越界）
    for (let left, mid, right, step = 1; step < n; step <<= 1) {
      left = 0;
      while (left < n) {
        // 从左侧拿出step个元素
        mid = left + step - 1;
        if (mid + 1 >= n) {
          // 右侧的头>=n，说明右侧没有元素了，可以跳过merge
          break;
        }
        // 由于右侧不一定有这么多元素，所以需要判断右侧的边界
        right = Math.min(mid + step, n - 1);
        // 边界处理完毕，这一组开始merge
        merge(left, mid, right);
        // merge结束，准备开始下一组
        // left...mid mid+1...right
        //                         left...mid mid+1...right
        //                                                 left...mid mid+1...right
        left = right + 1;
      }
    }
  }

  function merge(left, mid, right) {
    let i = left;
    // 左侧的头
    let a = left;
    // 右侧的头
    let b = mid + 1;
    // 将小的元素放入help中，对应一侧的指针随之右移
    while (a <= mid && b <= right) {
      help[i++] = nums[a] < nums[b] ? nums[a++] : nums[b++];
    }
    // 要注意，虽然这里连着写了两个while，但其实是互斥的，最多只有一个while会执行
    while (a <= mid) {
      help[i++] = nums[a++];
    }
    while (b <= right) {
      help[i++] = nums[b++];
    }
    // help是已经排序好的结果，将其刷回原数组
    for (i = left; i <= right; i++) {
      nums[i] = help[i];
    }
  }

  mergeSort(nums.length);
  return nums;
}

// 小和问题
// nowcode链接：
function f(nums) {
  const n = nums.length;
  let ans = 0;
  let help = [];
  function smallSum(left, right) {
    if (left === right) return 0;
    let mid = left + ((right - left) >> 1);
    return (
      smallSum(left, mid) + smallSum(mid + 1, right) + merge(left, mid, right)
    );
  }
  function merge(left, mid, right) {
    // 计算
    let ans = 0;
    for (let j = mid + 1, i = left, sum = 0; j <= right; j++) {
      while (j <= mid && nums[i] <= nums[j]) {
        sum += nums[i++];
      }
      asn += sum;
    }
    // 排序
    let i = left;
    let a = left;
    let b = mid + 1;
    while (a <= mid && b <= right) {
      help[i++] = nums[a] < nums[b] ? nums[a++] : nums[b++];
    }
    while (a <= mid) {
      help[i++] = nums[a++];
    }
    while (b <= right) {
      help[i++] = nums[b++];
    }
    for (i = left; i <= right; i++) {
      nums[i] = help[i];
    }
  }

  smallSum(0, n - 1);
  return ans;
}

//翻转对
// leetcode链接：https://leetcode.cn/problems/reverse-pairs/
function reversePairs(nums) {
  const n = nums.length;
  let help = [];
  function count(left, right) {
    // base case 自己和自己当然不能形成翻转对
    if (left === right) return 0;
    let mid = left + ((right - left) >> 1);
    // 左侧答案+右侧答案+左右合并的答案
    return count(left, mid) + count(mid + 1, right) + merge(left, mid, right);
  }
  function merge(left, mid, right) {
    // 计算
    let ans = 0;
    // i指向左侧的头，j指向右侧的头，满足条件j就右移
    // 每次统计以i为基准，翻转对的个数
    // left.......mid mid+1.......right
    // i              j
    for (let i = left, j = mid + 1; i <= mid; i++) {
      while (j <= right && nums[i] > nums[j] * 2) {
        j++;
      }
      // j往右移动了几步，那右侧就有几个能和i组合成翻转对
      ans += j - mid - 1;
    }
    // 排序代码，和昨天一摸一样，照抄！
    let i = left;
    let a = left;
    let b = mid + 1;
    while (a <= mid && b <= right) {
      help[i++] = nums[a] < nums[b] ? nums[a++] : nums[b++];
    }
    while (a <= mid) {
      help[i++] = nums[a++];
    }
    while (b <= right) {
      help[i++] = nums[b++];
    }
    for (i = left; i <= right; i++) {
      nums[i] = help[i];
    }
    return ans;
  }
  return count(0, n - 1);
}
