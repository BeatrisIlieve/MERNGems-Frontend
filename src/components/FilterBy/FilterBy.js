import { DynamicDropdown } from "../DynamicDropdown/DynamicDropdown";
import { getSerializedObject } from "../../utils/getSerializedObject";
import { getFilteredByStoneType } from "../../utils/getFilteredByStoneType";
import { getFilteredByStoneColor } from "../../utils/getFilteredByStoneColor";
import { useState, useEffect } from "react";
import styles from "./FilterBy.module.css";

const FILTER_BY_MENU_LABELS = {
  StoneType: { label: "Stone Type", selectionKey: "stoneType" },
  StoneColor: { label: "Stone Color", selectionKey: "stoneColor" },
};

export const FilterBy = ({
  stoneTypesData,
  stoneColorsData,
  setFilteredJewelries,
  filteredJewelries,
  setTotalCount,
  setLoadMoreDisabled,
  jewelries,
  fetchStonesCountData,
  setSelection,
  selection,
  itemsPerPage,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isSelectedStoneType, setIsSelectedStoneType] = useState(false);
  const [isSelectedStoneColor, setIsSelectedStoneColor] = useState(false);

  const clearFilter = (selectionKey) => {
    updateSelection(selectionKey);

    let filtered;

    if (
      selectionKey === FILTER_BY_MENU_LABELS.StoneType.selectionKey &&
      selection[FILTER_BY_MENU_LABELS.StoneColor.selectionKey]?.length > 0
    ) {
      filtered = getFilteredByStoneColor(jewelries, selection);
    } else if (
      selectionKey === FILTER_BY_MENU_LABELS.StoneColor.selectionKey &&
      selection[FILTER_BY_MENU_LABELS.StoneType.selectionKey]?.length > 0
    ) {
      filtered = getFilteredByStoneType(jewelries, selection);
    } else {
      filtered = jewelries;
    }

    const serializedObject = getSerializedObject(filtered);

    fetchStonesCountData(serializedObject);

    updateState(filtered);
    setLoadMoreDisabled(filtered.length > itemsPerPage);
  };

  const changeHandler = (e, entityTitle) => {
    const selected = e.target.value;
    const isChecked = e.target.checked;

    setSelection((state) => {
      if (isChecked) {
        return {
          ...state,
          [entityTitle]: [...(state[entityTitle] || []), Number(selected)],
        };
      } else {
        return {
          ...state,
          [entityTitle]: (state[entityTitle] || []).filter(
            (value) => value !== Number(selected)
          ),
        };
      }
    });
  };

  const submitHandler = (e, selectionKey) => {
    e.preventDefault();

    let filtered;

    if (selectionKey === FILTER_BY_MENU_LABELS.StoneType.selectionKey) {
      filtered = getFilteredByStoneType(filteredJewelries, selection);
    } else if (selectionKey === FILTER_BY_MENU_LABELS.StoneColor.selectionKey) {
      filtered = getFilteredByStoneColor(filteredJewelries, selection);
    } else {
      filtered = jewelries;
    }

    const serializedObject = getSerializedObject(filtered);

    fetchStonesCountData(serializedObject);

    updateState(filtered);
  };

  const updateSelection = (selectionKey) => {
    setSelection((prevState) => {
      const newState = {
        ...prevState,
        [selectionKey]: [],
      };

      return newState;
    });
  };

  const updateState = (filtered) => {
    setFilteredJewelries(filtered);

    setTotalCount(filtered.length);

    setLoadMoreDisabled(filtered.length <= itemsPerPage);
  };

  const toggleSelectedStoneType = () => {
    const isEmpty = selection.stoneType?.length > 0;

    setIsSelectedStoneType(isEmpty);
  };

  const toggleSelectedStoneColor = () => {
    const isEmpty = selection.stoneColor?.length > 0;

    setIsSelectedStoneColor(isEmpty);
  };

  useEffect(() => {
    toggleSelectedStoneType();
    toggleSelectedStoneColor();
  }, [selection]);

  return (
    <div className={styles["filter-by-container"]}>
      <div>Filter By:</div>
      <ul className={styles["filter-list"]} role="list">
        <li className={styles["filter-item"]}>
          <DynamicDropdown
            label={FILTER_BY_MENU_LABELS.StoneType.label}
            options={stoneTypesData}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            selection={selection}
            clearFilter={clearFilter}
            selectionKey={FILTER_BY_MENU_LABELS.StoneType.selectionKey}
            onDropdownToggle={(isOpen) => setDropdownIsOpen(isOpen)}
            isSelected={isSelectedStoneType}
          />
        </li>
        <div className={styles["form-vertical-line"]}></div>
        <li className={styles["filter-item"]}>
          <DynamicDropdown
            label={FILTER_BY_MENU_LABELS.StoneColor.label}
            options={stoneColorsData}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            selection={selection}
            clearFilter={clearFilter}
            selectionKey={FILTER_BY_MENU_LABELS.StoneColor.selectionKey}
            onDropdownToggle={(isOpen) => setDropdownIsOpen(isOpen)}
            isSelected={isSelectedStoneColor}
          />
        </li>
      </ul>
    </div>
  );
};
