// 一个简单的单链表构造函数
function ListNode(val, next) {
  this.val = val ? val : 0;
  this.next = next ? next : null;
}
// 双链表
function DoubleListNode(val, next, prev) {
  this.val = val ? val : 0;
  this.next = next ? next : null;
  this.prev = prev ? prev : null;
}

// 反转单链表
// leetcode链接：https://leetcode.cn/problems/reverse-linked-list/description/
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

//合并两个有序链表
// leetcode链接：https://leetcode.cn/problems/merge-two-sorted-lists/description/
function mergeTwoLists(head1, head2) {
  // 边缘case
  if (head1 === null) {
    return head2;
  }
  if (head2 === null) {
    return head1;
  }

  // 谁小谁做头
  let head = head1.val < head2.val ? head1 : head2;
  // cur1、cur2用于遍历旧链表，prev用于记录新链表的尾节点
  let cur1 = head.next;
  let cur2 = head === head1 ? head2 : head1;
  let prev = head;
  // 有任意一个节点为空就退出
  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      // cur1小，接到prev后面，cur1后移
      prev.next = cur1;
      cur1 = cur1.next;
    } else {
      // cur2小，接到prev后面，cur2后移
      prev.next = cur2;
      cur2 = cur2.next;
    }
    // prev后移
    prev = prev.next;
  }
  // 将剩下的节点直接接到尾部
  prev.next = cur1 ? cur1 : cur2;

  return head;
}
