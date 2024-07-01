import { useState } from "react";
import { useService } from "../hooks/useService";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import { stoneServiceFactory } from "../services/stoneService";

export const useJewelryList = (fetchDataFunction, entityId = null) => {
  const [jewelries, setJewelries] = useState([]);
  const [filteredJewelries, setFilteredJewelries] = useState([]);
  const serviceFactory = useService(fetchDataFunction);
  const stoneService = useService(stoneServiceFactory);
  let [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(filteredJewelries.length);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(
    filteredJewelries.length <= ITEMS_PER_PAGE
  );
  const [stoneTypesData, setStoneTypesData] = useState([]);
  const [stoneColorsData, setStoneColorsData] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { data, totalCount, stoneTypesData, stoneColorsData } =
          await serviceFactory.findAll(entityId);

        setJewelries(data);
        setFilteredJewelries(data);

        setStoneTypesData(stoneTypesData);
        setStoneColorsData(stoneColorsData);
        setLoadMoreDisabled(totalCount <= ITEMS_PER_PAGE);
        setTotalCount(totalCount)
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const fetchStonesCountData = async (serializedObject) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const { stoneColorsData } = await stoneService.findStoneColors(
          serializedObject
        );

        setStoneColorsData(stoneColorsData);

        const { stoneTypesData } = await stoneService.findStoneTypes(
          serializedObject
        );

        setStoneTypesData(stoneTypesData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const mouseEnterHandler = (_id) => {
    setFilteredJewelries((state) =>
      state.map((j) =>
        j._id === _id ? { ...j, isHovered: true } : { ...j, isHovered: false }
      )
    );
  };

  const mouseLeaveHandler = (_id) => {
    setFilteredJewelries((state) =>
      state.map((j) => (j._id === _id ? { ...j, isHovered: false } : j))
    );
  };

  const toggleLike = (jewelryId) => {
    setJewelries((prevJewelries) => {
      return prevJewelries.map((jewelry) => {
        if (jewelry._id === jewelryId) {
          return { ...jewelry, isLikedByUser: !jewelry.isLikedByUser };
        }
        return jewelry;
      });
    });

    setFilteredJewelries((prevFilteredJewelries) => {
      return prevFilteredJewelries.map((jewelry) => {
        if (jewelry._id === jewelryId) {
          return { ...jewelry, isLikedByUser: !jewelry.isLikedByUser };
        }
        return jewelry;
      });
    });
  };

  return {
    setJewelries,
    jewelries,
    loading,
    mouseEnterHandler,
    mouseLeaveHandler,
    fetchData,
    totalCount,
    loadMoreDisabled,
    setLoadMoreDisabled,
    stoneTypesData,
    stoneColorsData,
    setFilteredJewelries,
    filteredJewelries,
    setTotalCount,
    fetchStonesCountData,
    toggleLike,
  };
};
