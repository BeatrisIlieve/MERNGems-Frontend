import styles from "./Bag.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { BagList } from "./BagList/BagList";
import { Link } from "react-router-dom";
import { useBagContext } from "../../contexts/BagContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { EmptyBag } from "./EmptyBag/EmptyBag";

export const Bag = () => {
  const { bagItems, totalPrice, totalQuantity, isEmpty, loading } =
    useBagContext();

  const from = "/user/shopping-bag";
  localStorage.setItem("lastLocation", from);

  return (
    <section className={styles["bag-box"]}>
      <h2 className={styles["bag-title"]}>Your Bag</h2>
      {!isEmpty ? (
        <div>
          <div className={styles["bag-container"]}>
            <div className={styles["bag-left-container"]}>
              <div className={styles["bag-left-container-title"]}>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  <FontAwesomeIcon
                    icon={faTruck}
                    className={styles["delivery-icon"]}
                  />
                </span>
                <span
                  className={styles["bag-left-container-title-with-padding"]}
                >
                  Delivery
                </span>
                <span className={styles["delivery-span"]}>
                  ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                </span>
              </div>
              <ul className={styles["bag-left-sub-container"]}>
                {bagItems.map((item) => (
                  <li
                    key={item._id}
                    className={styles["bag-left-sub-left-container"]}
                  >
                    <BagList {...item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles["bag-right-container"]}>
              <div className={styles["bag-right-container-sticky"]}>
                <p className={styles["bag-right-container-title"]}>
                  Order Summary
                </p>
                <div className={styles["bag-right-sub-container"]}>
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p className={styles["bag-right-sub-container-bold"]}>
                      Subtotal
                    </p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                    >
                      ${totalPrice}
                    </p>
                  </div>
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p>Shipping</p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-not-bold"]}`}
                    >
                      Complimentary
                    </p>
                  </div>
                  <div className={styles["flex-container-line"]}>
                    <hr className={styles["hr-line"]} />
                    <img
                      className={styles["line-img"]}
                      src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                      alt=""
                    />
                    <hr className={styles["hr-line"]} />
                  </div>
                  <div className={styles["bag-right-sub-right-container"]}>
                    <p className={styles["bag-right-sub-container-bold"]}>
                      Total
                    </p>
                    <p
                      className={`${styles["bag-right-sub-container-absolute"]} ${styles["bag-right-sub-container-bold"]}`}
                    >
                      ${totalPrice}
                    </p>
                  </div>
                  <div className={styles["continue-checkout-button-container"]}>
                    <Link to={"/user/checkout"}>
                      <button className={styles["continue-checkout-button"]}>
                        Continue Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <LoadingSpinner />}
        </div>
      ) : (
        <EmptyBag />
      )}
    </section>
  );
};
