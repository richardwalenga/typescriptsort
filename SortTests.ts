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

class SimpleStopWatch {
    constructor() {
        this.started = NaN;
    }
    private started : number
    start() : void {
        this.started = new Date().getTime();
    }
    getElapsedMilliseconds() : number {
        return new Date().getTime() - this.started;
    }
}

let nums: number[] = [];
const watch = new SimpleStopWatch();
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
    watch.start();
    sorter.sort(nums);
    const diff = watch.getElapsedMilliseconds();
    const sorted = isSorted(nums);
    console.log(`${sorter.name} Sort took ${diff} milliseconds. Nums are sorted: ${sorted}.`);
}