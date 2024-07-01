import { FOOTERS_BY_TITLE } from "../../../constants/footers";
import styles from "./FooterJewelryList.module.css";

export const FooterJewelryList = ({ entityTitle }) => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-img-container"]}>
        <img
          className={styles["footer-img"]}
          src={FOOTERS_BY_TITLE[entityTitle][0]}
          alt={"Img"}
        />
      </div>
      <div className={styles["footer-info-container"]}>
        <h2 className={styles["footer-box-title"]}>
          {FOOTERS_BY_TITLE[entityTitle][3]} Collection
        </h2>
        <div className={styles["footer-paragraph-container"]}>
          <p className={styles["footer-box-paragraph"]}>
            {FOOTERS_BY_TITLE[entityTitle][1]}
          </p>
        </div>
      </div>
    </div>
  );
};
