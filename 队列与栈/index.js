//实现循环队列
// leetcode连接：https://leetcode.cn/problems/design-circular-queue/description/
const MyCircularQueue = function (k) {
  // 申请一个长度为k的数组
  this.queue = new Array(k);
  // limit为数组总长度，size为队列长度，用于控制队列头尾left和right的行为
  this.limit = k;
  this.size = 0;
  // 需要注意一下，left是队列头，而right则是队列尾的下一个位置
  // 由于每次入队时，都是从队列尾加入，所以这样设计right，入队只需要在right位置操作即可
  this.left = 0;
  this.right = 0;
};
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) {
    return false;
  } else {
    this.queue[this.right] = value;
    // 如果队列尾已经到了数组的尾部，那么right就回到数组头部
    this.right = this.right === this.limit - 1 ? 0 : this.right + 1;
    // 队列加入新元素，size++
    this.size++;
    return true;
  }
};
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  } else {
    // left同理，到达尾部就回到头部，实现队列的循环
    this.left = this.left === this.limit - 1 ? 0 : this.left + 1;
    // 有元素出队，size--
    this.size--;
    return true;
  }
};
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.queue[this.left];
  }
};
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    // 这里需要注意，从设计上，right是队列尾的下一个位置，所以取队尾的元素实际上要取right的前一位
    // 若right为0，那么队尾实际上在数组的尾部
    let last = this.right === 0 ? this.limit - 1 : this.right - 1;
    return this.queue[last];
  }
};
// 队列是否为空
MyCircularQueue.prototype.isEmpty = function () {
  return this.size === 0;
};
// 队列是否已满
MyCircularQueue.prototype.isFull = function () {
  return this.size === this.limit;
};

// 用栈实现队列
// leetcode连接：https://leetcode.cn/problems/implement-queue-using-stacks/description/
const MyQueue = function () {
  this.in = new Array();
  this.out = new Array();
};
// 执行将in栈倒入out栈中的操作
// out栈为空时才能倒入，并且一次要全倒完
MyQueue.prototype.inToOut = function () {
  if (this.out.length === 0) {
    while (this.in.length > 0) {
      this.out.push(this.in.pop());
    }
  }
};
// 元素加入后，检查是否需要倒入
MyQueue.prototype.push = function (x) {
  this.in.push(x);
  this.inToOut();
};
// 先检查是否需要倒入，再做出队或取队头的操作
MyQueue.prototype.pop = function (x) {
  this.inToOut();
  return this.out.pop();
};
MyQueue.prototype.peek = function () {
  this.inToOut();
  return this.out[this.out.length - 1];
};
// 两个栈都为空时队列才为空
MyQueue.prototype.empty = function () {
  return this.in.length === 0 && this.out.length === 0;
};

// 用队列实现栈
// leetcode连接：https://leetcode.cn/problems/implement-stack-using-queues/description/
const MyStack = function () {
  this.queue = new Array();
};
// 每次加入元素时，都要进行倒序操作
MyStack.prototype.push = function (x) {
  let size = this.queue.length;
  this.queue.push(x);
  while (size) {
    this.queue.push(this.queue.shift());
    size--;
  }
};
MyStack.prototype.pop = function () {
  return this.queue.shift();
};
MyStack.prototype.top = function () {
  return this.queue[0];
};
MyStack.prototype.empty = function () {
  return this.queue.length === 0;
};
