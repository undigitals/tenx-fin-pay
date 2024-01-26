export function minBy<T>(items: T[], iteratee: (item: T) => number): number {
  let min = Number.POSITIVE_INFINITY;
  for (const item of items) {
    const value = iteratee(item);
    if (value < min) {
      min = value;
    }
  }
  return min;
}

export function maxBy<T>(items: T[], iteratee: (item: T) => number): number {
  let max = Number.NEGATIVE_INFINITY;
  for (const item of items) {
    const value = iteratee(item);
    if (value > max) {
      max = value;
    }
  }
  return max;
}
