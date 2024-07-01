import styles from "./LocationPopup.module.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const LocationPopup = ({ popupCloseHandler }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        popupCloseHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupCloseHandler]);

  return (
    <section className={styles["popup-box"]}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div id={styles["xMark"]} onClick={() => popupCloseHandler()}>
              <FontAwesomeIcon
                icon={faXmark}
                className={styles["x-mark"]}
                data-testid="delete-account-popup-x-mark"
              />
            </div>
            <h2 className={styles["title"]}>
              Location and Contact Information
            </h2>
          </div>
          <div className={styles["details-container"]}>
            <p className={styles["paragraph"]}>
              {" "}
              <span className={styles["bolded"]}>Country:</span> Bulgaria
            </p>
            <p className={styles["paragraph"]}>
              {" "}
              <span className={styles["bolded"]}>City:</span> Sofia
            </p>
            <p className={styles["paragraph"]}>
              <span className={styles["bolded"]}>Email:</span>{" "}
              beatrisilieve@icloud.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
