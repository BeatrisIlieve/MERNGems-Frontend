import React from "react";
import styles from "./Page404.module.css";
import { Link } from "react-router-dom";
import { HEROES_BY_TITLE } from "../../constants/heroes";
import { HeroJewelryList } from "../JewelryList/HeroJewelryList/HeroJewelryList";

export const Page404 = () => {
  return (
    <section className={styles["page404-box"]}>
      <h2 className={styles["title"]}>Sorry, we can’t locate that page.</h2>
      <p className={styles["paragraph"]}>
        You can continue shopping by exploring the links below
      </p>
      {Object.keys(HEROES_BY_TITLE).map((title) => (
        <Link
          key={title}
          to={HEROES_BY_TITLE[title][2] || "#"}
          className={styles["no-decoration"]}
        >
          <HeroJewelryList entityTitle={title} />
        </Link>
      ))}
    </section>
  );
};
