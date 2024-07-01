import React, { useState, useEffect, useRef } from "react";
import styles from "../CardDetailsForm.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EXPIRATION_MONTH_ERROR_MESSAGE = "Expiration month is required";

export const MonthDropdown = ({
  setExpirationMonth,
  setExpirationMonthErrorOccurred,
  expirationMonthErrorOccurred,
}) => {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("MM *");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const generateMonthOptions = () => {
      const currentMonth = new Date().getMonth() + 2;
      const monthsArray = [];

      for (let month = currentMonth; month <= 12; month++) {
        monthsArray.push(month.toString().padStart(2, "0"));
      }

      setMonths(monthsArray);
    };

    generateMonthOptions();
  }, []);

  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
    setExpirationMonth(month);
    setExpirationMonthErrorOccurred(false);
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
      className={`${styles["dropdown-month"]} ${
        expirationMonthErrorOccurred === true ? styles["error"] : ""
      }`.trim()}
    >
      <button
        className={styles["dropdown-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="dropdown-toggle-month"
      >
        {selectedMonth}
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
      {expirationMonthErrorOccurred && (
        <div
          className={styles["error-message"]}
          data-testid="error-message-month"
        >
          {EXPIRATION_MONTH_ERROR_MESSAGE}
        </div>
      )}
      {isOpen && (
        <ul
          className={styles["dropdown-menu"]}
          data-testid="dropdown-menu-month"
        >
          <li
            onClick={() => handleSelect("DD")}
            className={styles["top-li"]}
            data-testid="month-dropdown-title"
          >
            MM
          </li>
          {months.map((month) => (
            <li
              key={month}
              onClick={() => handleSelect(month)}
              data-testid={`month-option-${month}`}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
