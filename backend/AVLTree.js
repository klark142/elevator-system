// backend/AVLTree.js
class Node {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }
  
  class AVLTree {
    constructor() {
      this.root = null;
    }
  
    insert(key) {
      this.root = this._insert(this.root, key);
    }
  
    _insert(root, key) {
      if (!root) {
        return new Node(key);
      } else if (key < root.key) {
        root.left = this._insert(root.left, key);
      } else {
        root.right = this._insert(root.right, key);
      }
  
      root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
  
      let balance = this.getBalance(root);
  
      if (balance > 1 && key < root.left.key) {
        return this.rightRotate(root);
      }
      if (balance < -1 && key > root.right.key) {
        return this.leftRotate(root);
      }
      if (balance > 1 && key > root.left.key) {
        root.left = this.leftRotate(root.left);
        return this.rightRotate(root);
      }
      if (balance < -1 && key < root.right.key) {
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
      }
  
      return root;
    }
  
    delete(key) {
      this.root = this._delete(this.root, key);
    }
  
    _delete(root, key) {
      if (!root) {
        return root;
      }
  
      if (key < root.key) {
        root.left = this._delete(root.left, key);
      } else if (key > root.key) {
        root.right = this._delete(root.right, key);
      } else {
        if (!root.left) {
          return root.right;
        } else if (!root.right) {
          return root.left;
        }
  
        let temp = this.getMinValueNode(root.right);
        root.key = temp.key;
        root.right = this._delete(root.right, temp.key);
      }
  
      if (!root) {
        return root;
      }
  
      root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
  
      let balance = this.getBalance(root);
  
      if (balance > 1 && this.getBalance(root.left) >= 0) {
        return this.rightRotate(root);
      }
      if (balance > 1 && this.getBalance(root.left) < 0) {
        root.left = this.leftRotate(root.left);
        return this.rightRotate(root);
      }
      if (balance < -1 && this.getBalance(root.right) <= 0) {
        return this.leftRotate(root);
      }
      if (balance < -1 && this.getBalance(root.right) > 0) {
        root.right = this.rightRotate(root.right);
        return this.leftRotate(root);
      }
  
      return root;
    }
  
    leftRotate(z) {
      let y = z.right;
      let T2 = y.left;
  
      y.left = z;
      z.right = T2;
  
      z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
  
      return y;
    }
  
    rightRotate(z) {
      let y = z.left;
      let T3 = y.right;
  
      y.right = z;
      z.left = T3;
  
      z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
      y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
  
      return y;
    }
  
    getHeight(root) {
      if (!root) {
        return 0;
      }
      return root.height;
    }
  
    getBalance(root) {
      if (!root) {
        return 0;
      }
      return this.getHeight(root.left) - this.getHeight(root.right);
    }
  
    getMinValueNode(root) {
      if (!root || !root.left) {
        return root;
      }
      return this.getMinValueNode(root.left);
    }
  
    inorderTraversal() {
      this._inorderTraversal(this.root);
    }
  
    _inorderTraversal(root) {
      if (!root) {
        return;
      }
      this._inorderTraversal(root.left);
      console.log(root.key + " ");
      this._inorderTraversal(root.right);
    }
  
    findSuccessor(key) {
      return this._findSuccessor(this.root, key);
    }
  
    _findSuccessor(root, key) {
      let successor = null;
      let current = root;
      while (current) {
        if (key < current.key) {
          successor = current;
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return successor ? successor.key : null;
    }
  
    findPredecessor(key) {
      return this._findPredecessor(this.root, key);
    }
  
    _findPredecessor(root, key) {
      let predecessor = null;
      let current = root;
      while (current) {
        if (key > current.key) {
          predecessor = current;
          current = current.right;
        } else {
          current = current.left;
        }
      }
      return predecessor ? predecessor.key : null;
    }
  
    findClosestValue(x) {
      return this._findClosestValue(this.root, x, this.root ? this.root.key : null);
    }
  
    _findClosestValue(root, x, closest) {
      if (!root) {
        return closest;
      }
  
      if (Math.abs(root.key - x) < Math.abs(closest - x)) {
        closest = root.key;
      }
  
      if (x < root.key) {
        return this._findClosestValue(root.left, x, closest);
      } else if (x > root.key) {
        return this._findClosestValue(root.right, x, closest);
      } else {
        return closest;
      }
    }
  
    inorderList() {
      let result = [];
      this._inorderList(this.root, result);
      return result;
    }
  
    _inorderList(root, result) {
      if (root) {
        this._inorderList(root.left, result);
        result.push(root.key);
        this._inorderList(root.right, result);
      }
    }
  
    exists(key) {
      return this._exists(this.root, key);
    }
  
    _exists(root, key) {
      if (!root) {
        return false;
      }
      if (key < root.key) {
        return this._exists(root.left, key);
      } else if (key > root.key) {
        return this._exists(root.right, key);
      } else {
        return true;
      }
    }
  }
  
  module.exports = AVLTree;
  