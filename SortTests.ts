import { BubbleSorter } from "./BubbleSorter"
import { CocktailShakerSorter } from "./CocktailShakerSorter"
import { HeapSorter } from "./HeapSorter"
import { InsertionSorter } from "./InsertionSorter"
import { MergeSorter } from "./MergeSorter"
import { QuickSorter } from "./QuickSorter"
import { SelectionSorter } from "./SelectionSorter"

function isSorted(nums: number[]): boolean {
    for (let i = 0; i < nums.length - 1; ++i) {
        if (nums[i + 1] < nums[i]) {
            return false;
        }
    }
    return true;
}

let nums: number[] = [];
const [numbersToSort, maximumInt] = [20000, 100000];
for (let i = 0; i < numbersToSort; ++i) {
    nums.push(Math.floor(maximumInt * Math.random()));
}
const [numsBak, insertionSorter] = [nums.slice(0), new InsertionSorter()];
const sorters = [
    new BubbleSorter(),
    new CocktailShakerSorter(),
    insertionSorter,
    new SelectionSorter(),
    new MergeSorter(insertionSorter),
    new HeapSorter(insertionSorter),
    new QuickSorter()
];

for (let sorter of sorters) {
    nums = numsBak.slice(0);
    const begin = new Date().getTime();
    sorter.sort(nums);
    const diff = new Date().getTime() - begin;
    const sorted = isSorted(nums);
    console.log(`${sorter.name} Sort took ${diff} milliseconds. Nums are sorted: ${sorted}.`);
}