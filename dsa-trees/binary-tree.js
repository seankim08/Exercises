/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      if (!node.left && !node.right) return 1;
      if (!node.left) return minDepthHelper(node.right) + 1;
      if (!node.right) return minDepthHelper(node.left) + 1;
      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (!node) return 0;
      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let result = { maxSum: -Infinity };

    function maxSumHelper(node, result) {
      if (!node) return 0;

      let leftSum = maxSumHelper(node.left, result);
      let rightSum = maxSumHelper(node.right, result);

      let maxBranch = Math.max(node.val, node.val + Math.max(leftSum, rightSum));
      let maxCase = Math.max(maxBranch, node.val + leftSum + rightSum);

      result.maxSum = Math.max(result.maxSum, maxCase);

      return maxBranch;
    }

    maxSumHelper(this.root, result);
    return result.maxSum > -Infinity ? result.maxSum : 0;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;
    let stack = [this.root];

    while (stack.length) {
      let node = stack.pop();

      if (node.val > lowerBound) {
        if (!result || node.val < result) {
          result = node.val;
        }
      }

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    return result;
  }

}

module.exports = { BinaryTree, BinaryTreeNode };
