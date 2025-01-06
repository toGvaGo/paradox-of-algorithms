//先序遍历
//leetcode链接：https://leetcode.cn/problems/binary-tree-preorder-traversal/description/

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
