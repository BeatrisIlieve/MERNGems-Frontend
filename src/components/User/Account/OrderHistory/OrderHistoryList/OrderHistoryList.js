import styles from "./OrderHistoryList.module.css";
import { OrderSummary } from "../../../../OrderSummary/OrderSummary";
export const OrderHistoryList = ({
  _id,
  status,
  createdAt,
  subTotal,
  jewelries,
}) => {
  const date = createdAt.split("T")[0];
  return (
    <section className={styles["order-history-box"]}>
      <div className={styles["order-container"]}>
        <ul className={styles["jewelries"]} role="list">
          {jewelries.map((item) => (
            <li key={item._id} className={styles["jewelry-item"]}>
              <OrderSummary {...item} />
            </li>
          ))}
        </ul>
        <div className={styles["order-info"]}>
          <div className={styles["status"]}>
            <span className={styles["bolded"]}>Status:</span> {status}
          </div>
          <div className={styles["created-at"]}>
            <span className={styles["bolded"]}>Created At:</span> {date}
          </div>
          <div className={styles["total-price"]}>
            <span className={styles["bolded"]}>Total:</span> ${subTotal}
          </div>
        </div>
      </div>
    </section>
  );
};
