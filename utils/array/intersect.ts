export function intersect<T>(a: T[], b: T[]) {
  var setB = new Set(b);
  return [...Array.from(new Set(a))].filter((x) => setB.has(x));
}
