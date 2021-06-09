import { ISorter } from "./SortCommon"

export class InsertionSorter implements ISorter {
    constructor() {
        this.name = "Insertion";
    }
    readonly name: string;
    sort(nums: number[]): void {
        if (nums.length < 2) {
            return;
        }
        for (let i = 1; i <= nums.length; ++i) {
            const valueToMove = nums[i];
            let j = i - 1; // j must be in scope beyond the next loop
            for (; j >= 0 && nums[j] > valueToMove; --j) {
                nums[j + 1] = nums[j];
            }
            const moveValue = nums[i] !== valueToMove;
            if (moveValue) {
                // Have to compensate for the last decrement of j
                nums[j + 1] = valueToMove;
            }
        }
    }
}