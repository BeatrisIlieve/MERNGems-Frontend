import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../ToggleMenu/ToggleMenu.module.css";

export const ToggleMenu = ({ options, title, subtitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = () => {
    setMenuOpen(true);
  };

  return (
    <div>
      <div onClick={toggleMenu}>
        {isMenuOpen ? (
          <>
            <h3 className={styles["title"]}>
              {title}
              <span className={styles["arrow"]}>
                <FontAwesomeIcon icon={faAngleUp} />
              </span>
            </h3>
            <p className={`${styles["sub-title"]} ${styles["slideIn"]}`}>
              {subtitle}
            </p>
            <ul
              role="list"
              className={`${styles["toggle-list"]} ${styles["slideIn"]}`}
            >
              {options.map((option, index) => (
                <li
                  className={styles["toggle-item"]}
                  key={index}
                  onClick={() => handleMenuItemClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className={styles["title"]}>
              {title}
              <span className={styles["arrow"]}>
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};
