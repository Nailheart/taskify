const reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number,
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export { reorder };
