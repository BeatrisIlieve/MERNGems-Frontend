import { orderHistoryServiceFactory } from "../../../../services/orderHistoryService";
import { useService } from "../../../../hooks/useService";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import { OrderHistoryList } from "./OrderHistoryList/OrderHistoryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export const OrderHistory = () => {
  const orderHistoryService = useService(orderHistoryServiceFactory);
  const { userId } = useAuthContext();
  const [orderItems, setOrderItems] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  console.log(orderItems);
  console.log(ordersCount);

  useEffect(() => {
    orderHistoryService
      .findAll(userId)
      .then((data) => {
        setOrderItems(data);
        setOrdersCount(data.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [orderItems]);

  return (
    <>
      {ordersCount > 0 ? (
        <section className={styles["order-history-box"]}>
          <div className={styles["top-container"]}>
            <span className={styles["bag-left-container-title-with-padding"]}>
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className={styles["delivery-icon"]}
              />
            </span>
            <span className={styles["delivery-span"]}>
              ({ordersCount} {ordersCount > 1 ? "orders" : "order"})
            </span>
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
          <ul className={styles["order-history-container"]} role="list" data-testid="order-history-list">
            {orderItems.map((item) => (
              <li key={item._id}>
                <OrderHistoryList {...item} />
                <div className={styles["flex-container-line"]}>
                  <hr className={styles["hr-line"]} />
                  <img
                    className={styles["line-img"]}
                    src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                    alt=""
                  />
                  <hr className={styles["hr-line"]} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <h3 className={styles["no-orders"]}>You have no orders</h3>
      )}
    </>
  );
};
