export function calculateCells(width) {
  if (!width) return 20;
  const count = Math.round((width - 40) / 32);
  if (count > 20) return 20;
  if (count < 4) return 4;
  return count;
}

export const generateArray = (size) =>
  Array.from({ length: size }).map(() => Array.from({ length: size }));
