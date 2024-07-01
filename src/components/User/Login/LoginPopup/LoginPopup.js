import styles from "./LoginPopup.module.css";
import { Link } from "react-router-dom";

export const LoginPopup = () => {
  return (
    <section className={styles["popup-box"]} data-testid="login-popup">
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <h2 className={styles["title"]}>Your session has expired.</h2>
            <p className={styles["sub-title"]}>
              Please login again to continue.
            </p>
          </div>
          <Link to={"/user/login"}>
            <button className={styles["continue-button"]}>
              Go to Login Page
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
