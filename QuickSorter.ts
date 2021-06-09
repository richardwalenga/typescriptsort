import { ISorter, swapValuesIn } from "./SortCommon"

export class QuickSorter implements ISorter {
    constructor() {
        this.name = "Quick";
    }
    readonly name: string;
    sort(nums: number[]): void {
        this.sortBetweenIndexes(nums, 0, nums.length - 1);
    }
    private sortBetweenIndexes(nums: number[], low: number, high: number): void {
        if (low < high) {
            const pivot = this.partition(nums, low, high);
            this.sortBetweenIndexes(nums, low, pivot - 1);
            this.sortBetweenIndexes(nums, pivot + 1, high);
        }
    }
    /* Organizes the values between the high and low indexes where the
     * chosen pivot is moved to a new index where all values greater than
     * the pivot are to its right. The new index for the pivot is returned. */
    private partition(nums: number[], low: number, high: number): number {
        const pivot = nums[high];
        // initialize the index below low because the index is guaranteed
        // to be incremented before the pivot is moved to its new home.
        let newPivotIndex = low - 1;
        for (let i = low; i <= high - 1; ++i) {
            if (nums[i] <= pivot) {
                swapValuesIn(nums, ++newPivotIndex, i);
            }
        }
        // There will always be at least one swap call since if this is the 
        // first time, it means every value checked is greater than the pivot.
        swapValuesIn(nums, ++newPivotIndex, high);
        return newPivotIndex;
    }
}