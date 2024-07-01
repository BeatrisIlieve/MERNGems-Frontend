export const getSortedByPriceDesc = (collection) => {
  const sortedCollection = [...collection].sort((a, b) => {
    return b.price - a.price;
  });

  return sortedCollection;
};
