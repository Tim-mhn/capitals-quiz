import similarity from "similarity";

export function stringsAreSimilar(a: string, b: string) {
  const sim = similarity(a, b);
  return {
    isSimilar: sim > 0.5,
    isExact: sim === 1,
  };
}
