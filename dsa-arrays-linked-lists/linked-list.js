/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      let nextNode = this.head;
      this.head = newNode;
      newNode.next = nextNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {

    if (this.head === this.tail) {
      const target = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return target.val;
    } else {
      let current = this.head;

      while (current.next !== this.tail) {
        current = current.next;
      }
      const target = current.next;
      this.tail = current;
      current.next = null;
      this.length--;
      return target.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    const node = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      return node.val;
    } else {
      this.head = node.next;
      node.next = null;
      this.length--;
      return node.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head;

    for (let i = 0; current !== null; i++, current = current.next) {
      if (idx === i) {
        return current.val;
      }
    }

    return null;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head;

    for (let i = 0; current !== null && idx + 1 !== i; i++, current = current.next) {
      if (idx === i) {
        current.val = val;
      }
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);
    let current = this.head;

    if (idx === 0) {
      if (this.tail === this.head && this.head === null) {
        this.tail = newNode;
      }
      this.head = newNode;
      newNode.next = current;
      this.length++;
    }

    for (let i = 0; current !== null && idx > i; i++, current = current.next) {
      if (idx === i + 1) {
        let next = current.next;
        current.next = newNode;
        newNode.next = next;
        if (current === this.tail) {
          this.tail = newNode;
        }
        this.length++;
      }
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let current = this.head;

    if (this.head === this.tail && this.head !== null) {
      this.head = null;
      this.tail = null;
      this.length--;
      return current.val;
    }

    for (let i = 0; current !== null && idx + 1 !== i; i++, current = current.next) {
      if (idx === i + 1) {
        const target = current.next;

        if (target === this.tail) {
          this.tail = current;
          current.next = null;
          length--;
          return target.val;
        }
        current.next = target.next;
        length--;
        return target.val;
      }
    }

  }

  /** average(): return an average of all values in the list */

  average() {
    let current = this.head;
    let total = 0;
    let count = 0;

    while (current) {
      total += current.val;
      count++;
      current = current.next;
    }

    if (count !== 0) {
      return total / count;
    }

    return 0;
  }
}

module.exports = LinkedList;
