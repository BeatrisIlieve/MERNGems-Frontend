export const getFilteredByStoneColor = (collection, selection) => {
  const filtered = collection.filter((jewelry) => {
    const flattenedStoneColors = jewelry.stoneColorIds.flat();

    return flattenedStoneColors.some((id) => selection.stoneColor.includes(id));
  });
  return filtered;
};
