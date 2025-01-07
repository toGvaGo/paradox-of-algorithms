//先序遍历
//leetcode链接：https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
// 递归
function preorderTraversal(root) {
  const ans = [];

  // 先序遍历，遍历中处理ans输出
  const preorder = node => {
    if (!node) return;
    ans.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };

  preorder(root);
  return ans;
}
// 非递归
function preorderTraversal(root) {
  const ans = [];
  if (!root) return ans;
  const stack = [];
  //初始化栈，根节点入栈
  stack.push(root);
  // 栈为空时，遍历完毕
  while (stack.length) {
    const node = stack.pop();
    // 出栈即处理
    ans.push(node.val);
    // 先压右再压左，出栈顺就就是先左再右
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return ans;
}

//中序遍历
//leetcode链接：https://leetcode.cn/problems/binary-tree-inorder-traversal/

function inorderTraversal(root) {
  const ans = [];

  // 中序遍历，遍历中处理ans输出
  const inorder = node => {
    if (!node) return;
    inorder(node.left);
    ans.push(node.val);
    inorder(node.right);
  };

  inorder(root);
  return ans;
}
// 非递归
function inorderTraversal(root) {
  const ans = [];
  if (!root) return ans;
  const stack = [];
  let node = root;
  while (stack.length || node) {
    // 执行将左边一整条节点入栈的操作
    if (node !== null) {
      stack.push(node);
      node = node.left;
    } else {
      // 所有左节点都入栈了，开始执行出栈操作
      node = stack.pop();
      ans.push(node.val);
      // 每个节点出栈时都对他的右子树重复操作
      node = node.right;
    }
  }
  return ans;
}

//后序遍历
//leetcode链接：https://leetcode.cn/problems/binary-tree-postorder-traversal/description/

function postorderTraversal(root) {
  const ans = [];

  // 后序遍历，遍历中处理ans输出
  const postorder = node => {
    if (!node) return;
    postorder(node.left);
    postorder(node.right);
    ans.push(node.val);
  };

  postorder(root);
  return ans;
}
function f(node) {
  if (!node) return;
  // 1
  f(node.left);
  // 2
  f(node.right);
  // 3
}

// 非递归 双栈
function postorderTraversal(root) {
  const ans = [];
  if (!root) return ans;
  const stack = [];
  const collect = [];
  //初始化栈，根节点入栈
  stack.push(root);
  // 栈为空时，遍历完毕
  while (stack.length) {
    const node = stack.pop();
    // 每次都将弹出节点放入另一个栈中，颠倒顺序
    collect.push(node);
    // 先压左再压右，实现中右左的顺序
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  // collect本质上需要是一个栈，这里尽量不用js的其他语法
  while (collect.length) {
    ans.push(collect.pop().val);
  }
  return ans;
}