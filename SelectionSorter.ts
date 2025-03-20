import { ISorter, swapValuesIn } from './SortCommon';

export class SelectionSorter implements ISorter {
  constructor() {
    this.name = 'Selection';
  }
  readonly name: string;
  sort(nums: number[]): void {
    if (nums.length < 2) {
      return;
    }
    for (let i = 0; i < nums.length - 1; ++i) {
      let [min, swapWith] = [nums[i], 0];
      for (let j = i + 1; j < nums.length; ++j) {
        if (nums[j] < min) {
          [min, swapWith] = [nums[j], j];
        }
      }
      if (swapWith > 0) {
        swapValuesIn(nums, i, swapWith);
      }
    }
  }
}
