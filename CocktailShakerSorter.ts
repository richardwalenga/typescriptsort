import { swapValuesIn } from "./SortCommon"
import { BubbleSorter } from "./BubbleSorter"

export class CocktailShakerSorter extends BubbleSorter {
    constructor() {
        super("Cocktail Shaker");
        // By applying a bitmask of 1 less than a power of 2, I can cleanly
        // alternate sorting left to right followed by right to left.
        this.bitmask = 1;
        this.sortMethods = [ this.ltrSort, this.rtlSort ];
    }
    private readonly sortMethods: ((nums: number[]) => boolean)[];
    private readonly bitmask : number;
    sort(nums: number[]): void {
        if (nums.length < 2) {
            return;
        }
        for (let i = 0; this.sortMethods[i].call(this, nums); i = (i + 1) & this.bitmask);
    }

    protected rtlSort(nums: number[]): boolean {
        let swapped = false;
        for (let i = nums.length - 1; i > 0; --i) {
            if (nums[i] < nums[i - 1]) {
                swapValuesIn(nums, i - 1, i);
                swapped = true;
            }
        }
        return swapped;
    }
}