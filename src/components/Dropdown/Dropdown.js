import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dropdown.module.css";

export const Dropdown = ({ label, subLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    <div ref={dropdownRef} className="dropdown">
      <button onClick={toggleDropdown} className={styles["dropdown-toggle"]}>
        <span className={styles["label-span"]}>{subLabel}</span>
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
      {isOpen && <div className={styles["dropdown-menu"]}>{children}</div>}
    </div>
  );
};
