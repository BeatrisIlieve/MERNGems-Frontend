import styles from "./BagList.module.css";
import { useBagContext } from "../../../contexts/BagContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export const BagList = ({
  _id,
  firstImageUrl,
  jewelryTitle,
  totalPrice,
  maxQuantity,
  quantity,
  size,
}) => {
  const { onDecrement, onIncrement, onRemove } = useBagContext();
  return (
    <>
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
        <div className={styles["jewelry-bag-composition-button-container"]}>
          <button
            className={styles["jewelry-bag-composition-button"]}
            onClick={() => onRemove(_id)}
            data-testid="remove-button"
          >
            Remove
          </button>
        </div>
      </div>
      <div className={styles["jewelry-bag-price-quantity"]}>
        <h4 className={styles["jewelry-bag-price"]} data-testid="total-price">
          ${totalPrice}
        </h4>
        <div className={styles["jewelry-bag-quantity"]}>
          <div>
            <button
              className={styles["jewelry-bag-quantity-button"]}
              onClick={() => onDecrement(_id)}
              data-testid="decrement-button"
            >
              <FontAwesomeIcon icon={faMinus} className={styles["dark-pink"]} />
            </button>
          </div>
          <div
            className={styles["jewelry-bag-quantity-input"]}
            data-testid="quantity"
          >
            {quantity}
          </div>
          <div>
            <button
              className={styles["jewelry-bag-quantity-button"]}
              onClick={() => onIncrement(_id)}
              data-testid="increment-button"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`${styles["icon-available"]} ${
                  maxQuantity === quantity ? styles["icon-not-available"] : ""
                }`.trim()}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
