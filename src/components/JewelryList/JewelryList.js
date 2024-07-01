import { JewelryListItems } from "./JewelryListItems/JewelryListItems";
import styles from "./JewelryList.module.css";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { useJewelryList } from "../../hooks/useJewelryList";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import { SortBy } from "../SortBy/SortBy";
import { FilterBy } from "../FilterBy/FilterBy";
import { HeroJewelryList } from "./HeroJewelryList/HeroJewelryList";
import { HorizontalLine } from "../HorizontalLine/HorizontalLine";
import { FooterJewelryList } from "./FooterJewelryList/FooterJewelryList";

export const JewelryList = ({ entityId, entityTitle, serviceFactory }) => {
  const {
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
  } = useJewelryList(serviceFactory, entityId);

  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [selection, setSelection] = useState({});

  const loadMoreHandler = () => {
    const nextPage = page + 1;
    if (nextPage * ITEMS_PER_PAGE >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setPage(nextPage);

    const newDisplayedItems = displayedItems + ITEMS_PER_PAGE;

    if (newDisplayedItems >= totalCount) {
      setLoadMoreDisabled(true);
    }
    setDisplayedItems(newDisplayedItems);
  };

  useEffect(() => {
    setJewelries([]);
    setSelection({});
    setPage(0);
    setLoadMoreDisabled(false);
    setDisplayedItems(ITEMS_PER_PAGE);
    fetchData();
  }, [entityId, entityTitle]);

  const displayedJewelries = filteredJewelries.slice(0, displayedItems);

  return (
    <section>
      <HeroJewelryList
        entityTitle={entityTitle}
        data-testid="hero-jewelry-list"
      />
      <div className={styles["jewelries-box"]}>
        <div className={styles["jewelries-nav"]}>
          <FilterBy
            stoneTypesData={stoneTypesData}
            stoneColorsData={stoneColorsData}
            setFilteredJewelries={setFilteredJewelries}
            filteredJewelries={filteredJewelries}
            setTotalCount={setTotalCount}
            setLoadMoreDisabled={setLoadMoreDisabled}
            jewelries={jewelries}
            fetchStonesCountData={fetchStonesCountData}
            setSelection={setSelection}
            selection={selection}
            itemsPerPage={ITEMS_PER_PAGE}
          />
          <SortBy
            entityId={entityId}
            entityTitle={entityTitle}
            filteredJewelries={filteredJewelries}
            setFilteredJewelries={setFilteredJewelries}
          />
        </div>
        <div className={styles["jewelries-count"]}>
          Showing 1 -{" "}
          {totalCount >= displayedItems ? displayedItems : totalCount} 0f{" "}
          {totalCount}
        </div>
        <div className={styles["jewelries-container"]}>
          {displayedJewelries.map((j) => (
            <JewelryListItems
              key={j._id}
              {...j}
              mouseEnterHandler={mouseEnterHandler}
              toggleLike={toggleLike}
              mouseLeaveHandler={mouseLeaveHandler}
            />
          ))}
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {loadMoreDisabled === false && (
              <div className={styles["load-more-button"]}>
                <LoadMoreButton
                  loadMoreHandler={loadMoreHandler}
                  loadMoreDisabled={loadMoreDisabled}
                />
              </div>
            )}
            <HorizontalLine />
          </>
        )}
      </div>
      <FooterJewelryList entityTitle={entityTitle} />
    </section>
  );
};
