import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EXPIRATION_YEAR_ERROR_MESSAGE = "Expiration year is required";

export const YearDropdown = ({
  setExpirationYear,
  setExpirationYearErrorOccurred,
  expirationYearErrorOccurred,
}) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("YY *");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const endYear = currentYear + 10;
      const yearsArray = [];

      for (let year = currentYear; year <= endYear; year++) {
        yearsArray.push(year.toString());
      }

      setYears(yearsArray);
    };

    generateYearOptions();
  }, []);

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
    setExpirationYear(year);
    setExpirationYearErrorOccurred(false);
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
  return (
    <div
      ref={dropdownRef}
      className={`${styles["dropdown-year"]} ${
        expirationYearErrorOccurred === true ? styles["error"] : ""
      }`.trim()}
    >
      <button
        className={styles["dropdown-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="dropdown-toggle-year"
      >
        {selectedYear}
        {isOpen ? (
          <FontAwesomeIcon
            icon={faChevronUp}
            className={styles["chevron-icon"]}
            // data-testid="chevron-up-icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={styles["chevron-icon"]}
            // data-testid="chevron-down-icon"
          />
        )}
      </button>
      {expirationYearErrorOccurred && (
        <div
          className={styles["error-message"]}
          data-testid="error-message-year"
        >
          {EXPIRATION_YEAR_ERROR_MESSAGE}
        </div>
      )}
      {isOpen && (
        <ul
          className={styles["dropdown-menu"]}
          data-testid="dropdown-menu-year"
        >
          <li
            onClick={() => handleSelect("DD")}
            className={styles["top-li"]}
            data-testid="year-dropdown-title"
          >
            YY
          </li>
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleSelect(year)}
              data-testid={`year-option-${year}`}
            >
              {year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
