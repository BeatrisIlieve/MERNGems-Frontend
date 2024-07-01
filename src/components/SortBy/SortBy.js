import { Dropdown } from "../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { getSortedByPriceAsc } from "../../utils/getSortedByPriceAsc";
import { getSortedByPriceDesc } from "../../utils/getSortedByPriceDesc";
import { getSortedByAvailabilityAsc } from "../../utils/getSortedByAvailabilityAsc";
import styles from "./SortBy.module.css";
import { useState, useEffect } from "react";

const SORT_BY_MENU_LABELS = {
  AvailableNow: "Available Now",
  ByLowToHigh: "Price Low To High",
  ByHighToLow: "Price High To Low",
};

const SORT_BY_MENU_SUB_LABEL = {
  SortBy: "Sort By:",
};

export const SortBy = ({
  entityId,
  entityTitle,
  filteredJewelries,
  setFilteredJewelries,
}) => {
  const [sortByAvailableNow, setSortByAvailableNow] = useState(true);
  const [sortByLowToHigh, setSortByLowToHigh] = useState(false);
  const [sortByHighToLow, setSortByHighToLow] = useState(false);

  const clickSortByAvailableNowHandler = () => {
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);

    getSortedByAvailableNow();
  };

  const clickSortByLowToHighHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(true);
    setSortByHighToLow(false);

    getSortedByLowToHigh();
  };

  const clickSortByHighToLowHandler = () => {
    setSortByAvailableNow(false);
    setSortByLowToHigh(false);
    setSortByHighToLow(true);

    getSortedByHighToLow();
  };

  const getSortedByLowToHigh = () => {
    const sortedJewelries = getSortedByPriceAsc(filteredJewelries);

    setFilteredJewelries(sortedJewelries);
  };

  const getSortedByHighToLow = () => {
    const sortedJewelries = getSortedByPriceDesc(filteredJewelries);

    setFilteredJewelries(sortedJewelries);
  };

  const getSortedByAvailableNow = () => {
    const sortedJewelries = getSortedByAvailabilityAsc(filteredJewelries);

    setFilteredJewelries(sortedJewelries);
  };

  const getSortLabel = () => {
    if (sortByAvailableNow) {
      return SORT_BY_MENU_LABELS.AvailableNow;
    } else if (sortByLowToHigh) {
      return SORT_BY_MENU_LABELS.ByLowToHigh;
    } else if (sortByHighToLow) {
      return SORT_BY_MENU_LABELS.ByHighToLow;
    }
    return SORT_BY_MENU_LABELS.AvailableNow;
  };

  useEffect(() => {
    setSortByAvailableNow(true);
    setSortByLowToHigh(false);
    setSortByHighToLow(false);
  }, [entityId, entityTitle]);

  return (
    <div className={styles["sort-by-container"]}>
      <Dropdown label={getSortLabel()} subLabel={SORT_BY_MENU_SUB_LABEL.SortBy}>
        <ul className={styles["sort-list"]} role="list">
          <li className={styles["sort-item"]}>
            <button
              className={styles["sort-button"]}
              onClick={() => clickSortByAvailableNowHandler()}
            >
              <FontAwesomeIcon
                icon={faCircle}
                className={`${styles["circle"]} ${
                  sortByAvailableNow === true ? styles["circle-selected"] : ""
                }`.trim()}
              />
              {SORT_BY_MENU_LABELS.AvailableNow}
            </button>
          </li>
          <li className={styles["sort-item"]}>
            <button
              className={styles["sort-button"]}
              onClick={() => clickSortByLowToHighHandler()}
            >
              <FontAwesomeIcon
                icon={faCircle}
                className={`${styles["circle"]} ${
                  sortByLowToHigh === true ? styles["circle-selected"] : ""
                }`.trim()}
              />
              {SORT_BY_MENU_LABELS.ByLowToHigh}
            </button>
          </li>
          <li className={styles["sort-item"]}>
            <button
              className={styles["sort-button"]}
              onClick={() => clickSortByHighToLowHandler()}
            >
              <FontAwesomeIcon
                icon={faCircle}
                className={`${styles["circle"]} ${
                  sortByHighToLow === true ? styles["circle-selected"] : ""
                }`.trim()}
              />
              {SORT_BY_MENU_LABELS.ByHighToLow}
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};
