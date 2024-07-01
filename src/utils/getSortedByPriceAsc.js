export const getSortedByPriceAsc = (collection) => {
  const sortedCollection = [...collection].sort((a, b) => {
    return a.price - b.price;
  });

  return sortedCollection;
};
