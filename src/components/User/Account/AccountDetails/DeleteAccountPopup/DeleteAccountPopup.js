import styles from "./DeleteAccountPopup.module.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const DeleteAccountPopup = ({
  popupSubmitHandler,
  popupCloseHandler,
}) => {
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
    <section className={styles["popup-box"]} data-testid="delete-account-popup">
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
            <h2 className={styles["title"]}>Delete Account</h2>
            <p className={styles["paragraph"]}>
              Are you sure you want to delete your Account?
            </p>
          </div>
          <div className={styles["button-container"]}>
            <button
              className={styles["button-cancel"]}
              onClick={() => popupCloseHandler()}
              data-testid="delete-account-popup-cancel"
            >
              Cancel
            </button>
            <div className={styles["form-vertical-line"]}></div>
            <button
              className={styles["button-delete"]}
              onClick={() => popupSubmitHandler()}
              data-testid="delete-account-popup-confirm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
