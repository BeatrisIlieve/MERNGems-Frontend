import styles from "./JewelryCard.module.css";

export const JewelryCard = ({ firstImageUrl, jewelryTitle, isSoldOut }) => {
  return (
    <article className={styles["jewelry-card"]}>
      <div
        className={`${styles["jewelry-card-thumbnail"]} ${
          isSoldOut === true ? styles["sold-out"] : ""
        }`.trim()}
      >
        <img
          className={styles["jewelry-card-img"]}
          src={firstImageUrl}
          alt={jewelryTitle}
        />
      </div>
      {isSoldOut && <span className={styles["sold-out-span"]}>SOLD OUT</span>}
    </article>
  );
};
