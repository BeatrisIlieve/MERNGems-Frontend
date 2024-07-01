export const getSortedByAvailabilityAsc = (collection) => {
  const sortedCollection = [...collection].sort((a, b) => {
    return a.isSoldOut - b.isSoldOut;
  });

  return sortedCollection;
};
