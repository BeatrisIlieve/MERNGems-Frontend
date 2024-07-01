export const getFilteredByStoneType = (collection, selection) => {
  const filtered = collection.filter((jewelry) => {
    const flattenedStoneTypes = jewelry.stoneTypeIds.flat();

    return flattenedStoneTypes.some((id) => selection.stoneType.includes(id));
  });
  return filtered;
};
