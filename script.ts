/**
 * Node class
 * Tree class
 * buildtree method
 * buildtree(array) output: level-0 root node
 *
 * -insert(value)
 *
 * delete(value)
 *
 * -find(value)
 *
 * levelOrder(cb(fn))
 *
 * -inorder, preorder and postorder functions
 *
 * height
 * depth
 * isBalanced
 * rebalance
 *
 */

//* npx ts-node script.ts

// class NodeElement {
//   data: any;
//   left: any;
//   right: any;
//   constructor(data: any = null, left: any = null, right: any = null) {
//     this.data = data;
//     this.left = left;
//     this.right = right;
//   }
// }
class NodeElement {
  constructor(
    public data: number | null,
    public left: any = null,
    public right: any = null
  ) {}
}

class Tree {
  root: any;
  left: any;
  right: any;
  height: number;
  constructor() {
    this.root = null;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
  createTreeFromArray(arr: Array<any>) {
    const uniques: Array<number> = [...new Set(arr)].sort((a, b) => a - b);
    const initialRoot = this.buildTree(uniques);
    return (this.root = initialRoot);
  }
  buildTree(arr: Array<number>): any {
    if (arr.length <= 1) return null;
    const mid = Math.floor(arr.length / 2);
    const newNode = new NodeElement(arr[mid]);
    newNode.left = this.buildTree(arr.splice(0, mid));
    newNode.right = this.buildTree(arr);
    return newNode;
  }
  logTree() {
    console.log(this.root);
  }
  bfslog() {
    let q = [this.root];
    while (q.length) {
      const curr = q.shift();
      console.log(curr.data);
      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
  }
  buildArrayFromNode(targetNode: any = this.root) {
    let q = [targetNode];
    let branchArr = [];
    while (q.length) {
      const currentNode = q.shift();
      branchArr.push(currentNode.data);
      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }
    return branchArr;
  }
  preorderLog(currentNode: any = this.root) {
    if (currentNode) {
      console.log(currentNode.data);
      this.preorderLog(currentNode.left);
      this.preorderLog(currentNode.right);
    }
  }
  inorderLog(currentNode: any = this.root) {
    if (currentNode) {
      this.inorderLog(currentNode?.left);
      console.log(currentNode.data);
      this.inorderLog(currentNode?.right);
    }
  }
  postorderLog(currentNode: any = this.root) {
    if (currentNode) {
      this.inorderLog(currentNode.left);
      this.inorderLog(currentNode.right);
      console.log(currentNode.data);
    }
  }
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '|   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true);
    }
  }
  find(val: any, currentNode: any = this.root): any {
    if (currentNode?.data === val) return currentNode;
    if (val < currentNode?.data) return this.find(val, currentNode.left);
    if (val > currentNode?.data) return this.find(val, currentNode.right);
    if (!currentNode) return false;
  }
  replaceBranch(currentNode: any = this.root, target: any, newBranchNode: any) {
    if (currentNode) {
      if (currentNode.data === target) return (currentNode = newBranchNode);
      this.replaceBranch(currentNode.left, target, newBranchNode);
      this.replaceBranch(currentNode.right, target, newBranchNode);
    }
  }
  insert(val: any, currentNode: any = this.root): any {
    if (currentNode?.data === val) return console.log(`${val} already exists`);
    if (val < currentNode?.data && currentNode.left === null) {
      return (currentNode.left = new NodeElement(val));
    }
    if (val > currentNode?.data && currentNode.right === null) {
      return (currentNode.right = new NodeElement(val));
    }
    if (val < currentNode?.data) return this.insert(val, currentNode.left);
    if (val > currentNode?.data) return this.insert(val, currentNode.right);
  }
  deleteNode(target: any, currentNode: any = this.root): any {
    // currentNode.left = null; //works
    if (!currentNode) return null;
    // < target is a leaf node >
    // left is target && leaf node
    if (
      currentNode.left?.data === target &&
      currentNode.left?.left === null &&
      currentNode.left?.right === null
    ) {
      return (currentNode.left = null);
    }
    // right is target && leaf node
    if (
      currentNode.right?.data === target &&
      currentNode.right?.left === null &&
      currentNode.right?.right === null
    ) {
      return (currentNode.right = null);
    }
    // < target has 1 child >
    // has left and NOT right
    if (
      currentNode?.data === target &&
      currentNode?.left !== null &&
      currentNode?.right === null
    ) {
      currentNode.data = currentNode?.left?.data;
      currentNode.left = currentNode?.left?.left;
      currentNode.right = currentNode?.left?.right;
      return;
      //  console.log(`target had only left branch`);
    }
    if (
      currentNode?.data === target &&
      currentNode?.left === null &&
      currentNode?.right !== null
    ) {
      currentNode.data = currentNode?.right?.data;
      currentNode.left = currentNode?.right?.left;
      currentNode.right = currentNode?.right?.right;
      return;
      //  console.log(`target had only right branch`);
    }
    // < target has two children >
    if (
      currentNode?.data === target &&
      currentNode?.left !== null &&
      currentNode.right !== null
    ) {
      // go right once, we want something BIGGER than our target node
      // but also SMALLER than our target node right
      // so we go right once, then check for left:
      let fastRef = currentNode.right;
      // target.right DOES NOT HAVE A LEFT
      // we can just push it's entire right side then
      if (fastRef.left === null) {
        currentNode.data = fastRef.data;
        return (currentNode.right = fastRef.right);
      }

      // if target.right HAS a left
      // we use a fast and slow pointer
      // fast will run until it hits a null,
      // slow will be the node just before the null (
      let slowRef = currentNode.right;
      while (fastRef.left) {
        slowRef = fastRef;
        fastRef = fastRef.left;
      }
      // kill the current tail, as it is our new targetNode .data
      slowRef.left = null;
      if (fastRef.right) slowRef.right = fastRef.right;
      return (currentNode.data = fastRef.data);
    }
    if (target < currentNode?.data) this.deleteNode(target, currentNode.left);
    if (target > currentNode?.data) this.deleteNode(target, currentNode.right);
  }
}

const migstree = new Tree();
migstree.createTreeFromArray([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
// migstree.createTreeFromArray([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// migstree.logTree();
// migstree.bfslog();
// migstree.dfs(migstree.root);
// migstree.prettyPrint();
// console.log(migstree.find(2));
// migstree.inorderLog();
// migstree.preorderLog();
// migstree.postorderLog();
// migstree.buildArrayFromNode();
// migstree.deletev2(4);
// console.log(migstree.find(6));
// migstree.insert(6);
// migstree.insert(6); // 6 already exists
// migstree.insert(20);
// migstree.deleteNodeTest(5);
// migstree.insert(1);
// migstree.deleteNodeTest(3);
migstree.insert(100);
// migstree.insert(320);
migstree.insert(75);
migstree.insert(125);
migstree.insert(103);
migstree.insert(126);
// migstree.insert(200);
// migstree.insert(200);
// migstree.insert(200);
// migstree.insert(200);
// migstree.insert(200);
// migstree.insert(200);
// migstree.deleteNodeTest(200);
migstree.prettyPrint();
// migstree.deleteNode(100);
// migstree.deleteNode(4);
// migstree.deleteNode(5);
migstree.deleteNode(67);
migstree.prettyPrint();

/**
 * [ 1,3,4,5,7,8,9,23,67,324,6345 ]
 * get mid
 *
 * left = left.mid
 * right = right.mid
 *
 */

/**
 * need mid,
 * and left?
 * and right?
 *
 * ex:
 * get 8 (mid)
 * 8.left  = recursive([1,3,4,5,7])
 * 8.right = recursive([9,23,67,324,6345])
 *
 *
 * given array, calculate new mid
 * calculate left
 * calcuate right
 *
 * divide and conq left and right
 * UNTIL left or right are an array of 2 -> [1,3]
 * if(arr.length === 2)
 *
 * ~~left = Math.min(arr)~~
 * ~~right = Math.max(arr)~~
 *
 * (?) it is already sorted
 *
 * left = arr[0]
 * right = arr[1]
 *
 *
 * base case:
 * array.length === 2
 * what if one side is null (?)
 */
