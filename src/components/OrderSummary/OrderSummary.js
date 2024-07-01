import styles from "./OrderSummary.module.css";

export const OrderSummary = ({
  firstImageUrl,
  jewelryTitle,
  totalPrice,
  quantity,
  size,
}) => {
  return (
    <section className={styles["order-summary-container"]}>
      <div className={styles["jewelry-bag-image"]}>
        <img
          className={styles["jewelry-bag-img"]}
          src={firstImageUrl}
          alt={firstImageUrl}
          data-testid="image"
        />
      </div>
      <div className={styles["jewelry-bag-composition"]}>
        <h2
          className={styles["jewelry-bag-composition-title"]}
          data-testid="title"
        >
          {jewelryTitle}
        </h2>
        <span className={styles["size-span"]} data-testid="size">
          Size: {size}
        </span>
      </div>
      <div className={styles["jewelry-bag-price-quantity"]}>
        <h4 className={styles["jewelry-bag-price"]} data-testid="price">
          ${totalPrice}
        </h4>
      </div>
      <span className={styles["quantity-span"]} data-testid="quantity">
        Qty: {quantity}
      </span>
    </section>
  );
};
