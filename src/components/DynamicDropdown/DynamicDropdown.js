import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./DynamicDropdown.module.css";

export const DynamicDropdown = ({
  label,
  options,
  selectionKey,
  changeHandler,
  submitHandler,
  selection,
  clearFilter,
  isSelected,
  onDropdownToggle = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onDropdownToggle(newIsOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    submitHandler(event, selectionKey);
    setIsOpen(false);
  };

  const dismissButtonHandler = (selectionKey) => {
    clearFilter(selectionKey);
  };

  return (
    <div ref={dropdownRef} className={styles["dropdown"]}>
      <button onClick={toggleDropdown} className={styles["dropdown-toggle"]}>
        <span className={styles["label-text"]}>{label}</span>
        {isOpen ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            className={styles["chevron-icon"]}
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles["chevron-icon"]}
          />
        )}
      </button>
      {isOpen && (
        <div className={styles["open-dropdown-menu"]}>
          <div className={styles["dropdown-menu"]}>
            {options.map((option, index) => (
              <div key={index} className={styles["dropdown-menu-options"]}>
                <input
                  type="checkbox"
                  name={option.title}
                  value={option._id}
                  id={option._id}
                  onChange={(e) => changeHandler(e, selectionKey)}
                  checked={selection[selectionKey]?.includes(option._id)}
                  className={`${styles["custom-checkbox"]} ${
                    selection[selectionKey]?.includes(option._id)
                      ? styles.checked
                      : ""
                  }`}
                />
                <label htmlFor={option.title}>{option.title}</label>
                <span className={styles["count-span"]}>({option.count})</span>
              </div>
            ))}
          </div>
          <div>
            {isSelected && (
              <div className={styles["button-container"]}>
                <button
                  onClick={handleSubmit}
                  className={`${styles["animated-button"]} ${styles["button"]}`}
                  type="submit"
                >
                  Apply
                </button>
                <button
                  onClick={() => dismissButtonHandler(selectionKey)}
                  className={styles["dismiss-button"]}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
