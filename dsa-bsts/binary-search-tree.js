class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
   
  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        }
        current = current.right;
      } else {
        // Value already exists in the tree
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
   
  insertRecursively(val) {
    const insert = (node) => {
      if (node === null) {
        return new Node(val);
      }

      if (val < node.val) {
        node.left = insert(node.left);
      } else if (val > node.val) {
        node.right = insert(node.right);
      }

      return node;
    };

    this.root = insert(this.root);
    return this;
  }


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
   
  find(val) {
    let current = this.root;
    while (current !== null) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
   
  findRecursively(val, node = this.root) {
    if (node === null) return undefined;
    if (val === node.val) return node;
    if (val < node.val) return this.findRecursively(val, node.left);
    return this.findRecursively(val, node.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
   
  dfsPreOrder() {
    let data = [];
    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
   
  dfsInOrder() {
    let data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
   
  dfsPostOrder() {
    let data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    }
    traverse(this.root);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
   
  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }
}

module.exports = BinarySearchTree;