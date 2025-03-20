export interface ISorter {
  readonly name: string;
  sort(nums: number[]): void;
}

export function swapValuesIn<T>(ary: T[], x: number, y: number): void {
  if (x == y) {
    return;
  }
  [ary[x], ary[y]] = [ary[y], ary[x]];
}
