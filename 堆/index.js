function swap(arr, i, j) {
  // ES6简便写法 这种交换速度慢
  // [arr[i], arr[j]] = [arr[j], arr[i]];
  // 标准交换写法
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

class Heap {
  constructor(compareFn) {
    this.array = [];
    this.size = 0;
    // 默认为大根堆
    this.compareFn = compareFn ? compareFn : (a, b) => a - b;
  }
  //在index的位置插入节点，执行heapInsert往上调整。
  heapInsert(index) {
    while (
      index > 0 &&
      this.compareFn(
        this.array[index],
        this.array[Math.floor((index - 1) / 2)]
      ) > 0
    ) {
      swap(this.array, index, Math.floor((index - 1) / 2));
      index = Math.floor((index - 1) / 2);
    }
  }
  // index位置的节点值变了，执行heapify往下调整
  heapify(index) {
    let left = index * 2 + 1;
    while (left < this.size) {
      // left+1就是右孩子。
      // 若右孩子不越界且右孩子大于左孩子，取右孩子，否则取左孩子
      let best =
        left + 1 < this.size &&
        this.compareFn(this.array[left + 1], this.array[left]) > 0
          ? left + 1
          : left;
      best =
        this.compareFn(this.array[best], this.array[index]) > 0 ? best : index;
      // 若左右孩子都比自己小，则无需继续调整了
      if (best === index) break;
      swap(this.array, index, best);
      index = best;
      left = index * 2 + 1;
    }
  }
  // 自定义一个弹出方法（参考昨天的堆排序，取最大元素的方法）
  poll() {
    swap(this.array, 0, --this.size);
    this.heapify(0);
    return this.array.pop();
  }
  // 自定义一个加入方法
  add(el) {
    this.array.push(el);
    this.size++;
    this.heapInsert(this.size - 1);
  }
}
//堆排序
function heapSort(arr) {
  let n = arr.length;
  const heap = new Heap();
  // 一定不要忘记初始化堆的大小size
  heap.size = n;
  // 初始化,将数组元素逐一加入到堆中,并使用heapInsert调整
  for (let i = 0; i < n; i++) {
    heap.array.push(arr[i]);
    // heap.heapInsert(i);
  }
  for (let i = n - 1; i >= 0; i--) {
    heap.heapify(i);
  }
  // 逐一取出最大元素，并使用heapify调整堆,直到size为1
  while (heap.size > 1) {
    swap(heap.array, 0, --heap.size);
    heap.heapify(0);
  }
  return heap.array;
}

// 堆排序的优化：将arr作为堆的容器，直接将arr转化为大根堆
const duipaixudeyouhua = () => {
  function heapify(arr, index, size) {
    let left = index * 2 + 1;
    while (left < size) {
      let best = left + 1 < size && arr[left + 1] > arr[left] ? left + 1 : left;
      best = arr[best] > arr[index] ? best : index;
      if (best === index) break;
      swap(arr, index, best);
      index = best;
      left = index * 2 + 1;
    }
  }
  function sortArray(arr) {
    let n = arr.length;
    // 通过heapify从底到顶将arr转化为大根堆
    for (let i = n - 1; i >= 0; i--) {
      heapify(arr, i, n);
    }
    let size = n;
    // 每次取出最大值，重新调整arr为大根堆
    while (size > 1) {
      swap(arr, 0, --size);
      heapify(arr, 0, size);
    }
    return arr;
  }
};

// 合并K个有序链表
// leetcode链接：
// a和b都是链表的节点，需要比较的是他们的val值
function mergeKLists(lists) {
  if (lists.length === 0) return null;
  const compare = (a, b) => {
    // 返回正数a在前，返回负数b在前
    return b.val - a.val;
  };
  const heap = new Heap(compare);
  // 初始化小根堆，使用heapify会更快
  const k = lists.length;
  for (let i = 0; i < k; i++) {
    // 非空链表才加入堆中准备操作
    if (lists[i] !== null) {
      heap.array.push(lists[i]);
      heap.size++;
    }
  }
  // 若都是空链表，当然不用合并啦。
  if (!heap.size) {
    return null;
  }
  for (let i = k - 1; i >= 0; i--) {
    heap.heapify(i);
  }
  // 先弹出第一个做新链表的头节点
  const head = heap.poll();
  let pre = head;
  if (pre.next !== null) {
    heap.add(pre.next);
  }
  while (heap.size) {
    const cur = heap.poll();
    // 每弹出一个就接到新链表后面
    pre.next = cur;
    pre = cur;
    if (cur.next !== null) {
      heap.add(cur.next);
    }
  }
  return head;
}
// 重复线段
// leetcode链接：
function test() {}
// 将数组和减半的最少操作次数
// leetcode链接：https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/description/
function halveArray(nums) {
  const heap = new Heap();
  const n = nums.length;
  heap.size = n;
  let sum = 0;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    heap.array.push(nums[i]);
    // 记录原始的数组和
    sum += nums[i];
  }
  for (let i = n - 1; i >= 0; i--) {
    heap.heapify(i);
  }

  // 需要减少的目标值
  const target = sum / 2;
  // 当前已减少的和
  let cur = 0;
  while (cur < target) {
    // 直接操作堆顶元素
    heap.array[0] /= 2;
    cur += heap.array[0];
    ans++;
    // 记录答案后记得重新调整堆
    heap.heapify(0);
  }
  return ans;
}
