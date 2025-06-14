import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    const sortedArr = this.mergeSort(arr);
    this._root = this.buildTree(sortedArr);

    //console.log(this.prettyPrint(this._root));
  }

  inOrder(callback) {
    const arr = this.inOrderRecur(this._root);

    while(arr.length > 0){
      const cur = arr.shift();

      callback(cur);
    }

  }

  inOrderRecur(node) {
    if (!node) return;
    var arr = [];

    arr.push(node);
    if (node.left) {
      arr = arr.concat(this.inOrderRecur(node.left));
    }
    if (node.right) {
      arr = arr.concat(this.inOrderRecur(node.right));
    }

    return arr;
  }

  levelOrder(callback) {
    const queue = [];

    if (this._root) queue.push(this._root);

    while (queue.length > 0) {
      const cur = queue.shift();

      callback(curr);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }

  find(val) {
    var cur = this._root;

    while (cur && cur.val != val) {
      if (val < cur.val) {
        cur = cur.left;
      } else if (val > cur.val) {
        cur = cur.right;
      }
    }
    return cur;
  }

  insert(val) {
    const node = new Node();
    node.val = val;
    var cur = this._root;

    while (true) {
      if (val < cur.val) {
        if (!cur.left) {
          cur.left = node;
          return;
        }
        cur = cur.left;
      } else if (val > cur.val) {
        if (!cur.right) {
          cur.right = node;

          return;
        }
        cur = cur.right;
      } else {
        return;
      }
    }
  }

  delete(val) {
    const nodeParent = this.findNodeParent(this._root, val);
    var node;
    if (nodeParent && nodeParent.left.val == val) {
      node = nodeParent.left;

      if (node.left && node.right) {
        const smallestNode = this.findSmallestNode(node.right, val);

        smallestNode.left = node.left;
        smallestNode.right = node.right;
        nodeParent.left = smallestNode;
      } else if (node.left) {
        nodeParent.left = node.left;
      } else if (node.right) {
        nodeParent.left = node.right;
      } else {
        nodeParent.left = null;
      }
    } else if (nodeParent && nodeParent.right.val == val) {
      const node = nodeParent.right;

      if (node.left && node.right) {
        const smallestNode = this.findSmallestNode(node.right, val);

        smallestNode.left = node.left;
        smallestNode.right = node.right;
        nodeParent.right = smallestNode;
      } else if (node.left) {
        nodeParent.right = node.left;
      } else if (node.right) {
        nodeParent.right = node.right;
      } else {
        nodeParent.right = null;
      }
    } else if (nodeParent.val == this._root.val) {
      node = nodeParent;
      const smallestNode = this.findSmallestNode(node.right, val);
      smallestNode.left = node.left;
      smallestNode.right = node.right;
      this._root = smallestNode;
    }
  }

  findNodeParent(node, val) {
    if (this._root.val == val) return node;

    if (
      (node.left && node.left.val == val) ||
      (node.right && node.right.val == val)
    )
      return node;
    if (node.left && val < node.val) {
      return this.findNodeParent(node.left, val);
    } else if (node.right && val > node.val) {
      return this.findNodeParent(node.right, val);
    } else {
      return null;
    }
  }

  findSmallestNode(node, val) {
    if (node.left.left == null) {
      const temp = node.left;
      node.left = null;
      return temp;
    }

    return this.findSmallestNode(node.left, val);
  }

  // takes an array and turns it into a balanced tree
  // returns the level 0 root node
  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);
    node.val = arr[mid];

    node._left = this.buildTree(arr.slice(0, mid));
    node._right = this.buildTree(arr.slice(mid + 1, arr.length));

    return node;
  }

  //sort and remove duplicates
  mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid, arr.length));

    return this.merge(left, right);
  }

  merge(left, right) {
    const newArr = [];
    var j = 0;
    var k = 0;

    for (let i = 0; i < left.length + right.length; i++) {
      if (left[j] < right[k]) {
        newArr.push(left[j]);
        j++;
      } else if (left[j] > right[k]) {
        newArr.push(right[k]);
        k++;
      } else {
        // gets rid of duplicates
        newArr.push(left[j]);
        j++;
        k++;
      }

      if (j >= left.length || k >= right.length) break;
    }

    while (j < left.length) {
      newArr.push(left[j]);
      j++;
    }
    while (k < right.length) {
      newArr.push(right[k]);
      k++;
    }

    return newArr;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
