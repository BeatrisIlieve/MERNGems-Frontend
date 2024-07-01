export const getSerializedObject = (filtered) => {
  const jewelryIds = filtered.map((jewelry) => jewelry._id);
  const dynamicObject = { JewelryIds: jewelryIds };

  const serializedObject = JSON.stringify(dynamicObject);

  return serializedObject;
};
