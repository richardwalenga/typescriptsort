enum HeapifyDirection {
  Down,
  Up
}

class HeapNode {
  constructor(
    private readonly heap: Heap,
    private readonly index: number
  ) {
    this.isRoot = index == heap.rootIndex;
  }
  private readonly isRoot: boolean;
  getValue(): number {
    return this.heap.storage[this.index];
  }
  setValue(num: number): void {
    this.heap.storage[this.index] = num;
  }
  heapifyDown(): void {
    const [left, right] = [this.left(), this.right()];
    if (left == null && right == null) {
      return;
    }
    let node = right;
    if (left != null && right != null) {
      /* Favor the smallest or largest child node as a swap partner
       * depending on if one is working with a min or max heap.
       * The comparer will return true if the first value meets this
       * criteria. */
      if (this.heap.comparer(left.getValue(), right.getValue())) {
        node = left;
      }
    } else if (left != null) {
      node = left;
    }
    this.trySwapValueWith(node, HeapifyDirection.Down);
  }
  heapifyUp(): void {
    const parent = this.parent();
    if (parent == null) {
      return;
    }
    this.trySwapValueWith(parent, HeapifyDirection.Up);
  }
  left(): HeapNode | null {
    return this.getHeapNodeAtIndex(2 * this.index);
  }
  right(): HeapNode | null {
    return this.getHeapNodeAtIndex(2 * this.index + 1);
  }
  parent(): HeapNode | null {
    if (this.isRoot) {
      return null;
    }
    return new HeapNode(this.heap, Math.floor(this.index / 2));
  }
  private getHeapNodeAtIndex(idx: number): HeapNode | null {
    if (this.heap.isOutOfRange(idx)) {
      return null;
    }
    return new HeapNode(this.heap, idx);
  }
  private trySwapValueWith(
    otherNode: HeapNode | null,
    direction: HeapifyDirection
  ): void {
    if (otherNode == null) {
      return;
    }
    const [val, otherVal] = [this.getValue(), otherNode.getValue()];
    if (
      direction == HeapifyDirection.Down &&
      this.heap.comparer(otherVal, val)
    ) {
      this.setValue(otherVal);
      otherNode.setValue(val);
      otherNode.heapifyDown();
    } else if (
      direction == HeapifyDirection.Up &&
      this.heap.comparer(val, otherVal)
    ) {
      this.setValue(otherVal);
      otherNode.setValue(val);
      otherNode.heapifyUp();
    }
  }
}

export class Heap {
  constructor(isMin: boolean, size: number = 30) {
    if (size < 5) {
      throw 'Size too small';
    }
    // Ignore the first element of the array,
    // because the calculations of a node's
    // children are easier starting from 1.
    this.storage = new Array(size + 1);
    this.size = 0;
    this.rootIndex = 1;
    this.comparer = isMin ? (x, y) => x < y : (x, y) => x > y;
  }
  private size: number;
  readonly storage: number[];
  readonly rootIndex: number;
  readonly comparer: (x: number, y: number) => boolean;
  isOutOfRange(index: number): boolean {
    return index > this.size;
  }
  peek(): number {
    if (this.size == 0) {
      return NaN;
    }
    return this.storage[this.rootIndex];
  }
  store(num: number): void {
    this.storage[++this.size] = num;
    const settingRoot = this.size == this.rootIndex;
    if (!settingRoot) {
      new HeapNode(this, this.size).heapifyUp();
    }
  }
  take(): number {
    if (this.size == 0) {
      throw 'Empty heap';
    }
    // Choosing the last value to temporarily put in the root is
    // arbitrary but requires no extra processing time other than
    // what it takes to let it settle into its new position
    const taken = this.storage[this.rootIndex];
    this.storage[this.rootIndex] = this.storage[this.size--];
    if (this.size > 1) {
      new HeapNode(this, this.rootIndex).heapifyDown();
    }
    return taken;
  }
}
