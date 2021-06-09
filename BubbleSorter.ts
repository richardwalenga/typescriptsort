import { ISorter, swapValuesIn } from "./SortCommon"

export class BubbleSorter implements ISorter {
    constructor(public readonly name = "Bubble") {
    }
    sort(nums: number[]): void {
        if (nums.length < 2) {
            return;
        }
        while (this.ltrSort(nums));
    }

    protected ltrSort(nums: number[]): boolean {
        let swapped = false;
        for (let i = 1; i <= nums.length; ++i) {
            if (nums[i - 1] > nums[i]) {
                swapValuesIn(nums, i - 1, i);
                swapped = true;
            }
        }
        return swapped;
    }
}