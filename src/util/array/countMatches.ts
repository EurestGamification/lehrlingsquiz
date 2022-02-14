export function countMatches(a1: any[], a2: any[]): number {
  return a1.reduce(
    (acc: any, curr: any) => acc + a2.includes(curr),
    0
  );
}
