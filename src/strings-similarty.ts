import similarity from "similarity";

export function stringsAreSimilar(a: string, b: string) {
  const trimmedA = a.trim().toLowerCase();
  const trimmedB = b.trim().toLowerCase();

  const sim = similarity(trimmedA, trimmedB);
  return {
    isSimilar: sim > 0.5,
    isExact: sim === 1,
  };
}
