import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    const sortedArr = this.mergeSort(arr);
    this._root = this.buildTree(sortedArr);

    console.log(this.prettyPrint(this._root));
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
