import { HEROES_BY_TITLE } from "../../../constants/heroes";
import styles from "./HeroJewelryList.module.css";
import { HorizontalLine } from "../../HorizontalLine/HorizontalLine";

export const HeroJewelryList = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={HEROES_BY_TITLE[entityTitle][0]}
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            {HEROES_BY_TITLE[entityTitle][1]}
          </p>
        </div>
      </div>
    </div>
  );
};
