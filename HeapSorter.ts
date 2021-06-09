import { ISorter } from "./SortCommon"
import { InsertionSorter } from "./InsertionSorter"
import { Heap } from "./Heap";

export class HeapSorter implements ISorter {
    constructor(private insertionSorter: InsertionSorter) {
        this.name = "Heap";
    }
    readonly name: string;
    sort(nums: number[]): void {
        // Smaller arrays are more efficiently sorted
        // with insertion sort.
        if (nums.length < 10) {
            this.insertionSorter.sort(nums);
            return;
        }
        const isMin = true;
        const heap = new Heap(isMin, nums.length);
        for (let num of nums) {
            heap.store(num);
        }
        for (let i = 0; i < nums.length; ++i) {
            nums[i] = heap.take();
        }
    }
}