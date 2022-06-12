export default function areArraysEqual(a: any[] | null, b: any[] | null, orderMatters = false) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  if (!orderMatters) {
    a = a.sort()
    b = b.sort()
  }

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
