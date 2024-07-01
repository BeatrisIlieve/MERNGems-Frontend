import React from "react";
import styles from "./EmptyBag.module.css";
import { Link } from "react-router-dom";
import { HEROES_BY_TITLE } from "../../../constants/heroes";
import { HeroJewelryList } from "../../JewelryList/HeroJewelryList/HeroJewelryList";

export const EmptyBag = () => {
  return (
    <section className={styles["empty-bag-box"]}>
      <div className={styles["bag-sub-title"]}>
        <h3>Your Shopping Bag is Empty.</h3>
        <p>Explore and add something you love.</p>
      </div>
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
