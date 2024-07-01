import styles from "./MiniHeader.module.css";
import { Link } from "react-router-dom";

export const MiniHeader = () => {
  return (
    <header className={styles["mini-header"]}>
      <div className={styles["header-box"]}>
        <div className={styles["logo-container"]}>
          <img
            className={styles["logo-img"]}
            src={
              "https://res.cloudinary.com/deztgvefu/image/upload/v1714938396/template_images/Screenshot_2024-05-05_at_22.42.20-removebg-preview_xfkrvq.png"
            }
            alt={"Logo"}
          />
        </div>
      </div>
    </header>
  );
};
