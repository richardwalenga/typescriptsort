import { ISorter } from './SortCommon';
import { InsertionSorter } from './InsertionSorter';

export class MergeSorter implements ISorter {
  constructor(private insertionSorter: InsertionSorter) {
    this.name = 'Merge';
  }
  readonly name: string;
  sort(nums: number[]) {
    // Smaller arrays are more efficiently sorted
    // with insertion sort.
    if (nums.length <= 10) {
      this.insertionSorter.sort(nums);
      return;
    }

    const mid = Math.floor(nums.length / 2);
    const [first, second] = [nums.slice(0, mid), nums.slice(mid)];
    this.sort(first);
    this.sort(second);
    for (let [i, firstIdx, secondIdx] = [0, 0, 0]; i < nums.length; ++i) {
      const [canTakeFirst, canTakeSecond] = [
        firstIdx < first.length,
        secondIdx < second.length
      ];
      if (
        canTakeFirst &&
        (!canTakeSecond || first[firstIdx] <= second[secondIdx])
      ) {
        nums[i] = first[firstIdx];
        if (firstIdx < first.length) {
          ++firstIdx;
        }
      } else {
        nums[i] = second[secondIdx];
        if (secondIdx < second.length) {
          ++secondIdx;
        }
      }
    }
  }
}
