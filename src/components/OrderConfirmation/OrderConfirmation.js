import { orderConfirmationServiceFactory } from "../../services/orderConfirmationService";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useBagContext } from "../../contexts/BagContext";
import styles from "./OrderConfirmation.module.css";
import { personalInformationServiceFactory } from "../../services/personalInformationService";
import { Link } from "react-router-dom";

export const OrderConfirmation = () => {
  const orderConfirmationService = useService(orderConfirmationServiceFactory);
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);
  const { userId } = useAuthContext();
  const [order, setOrder] = useState(null);
  const { clearShoppingBag } = useBagContext();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const order = await orderConfirmationService.findOne(userId);

      setOrder(order);

      clearShoppingBag();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    personalInformationService
      .find(userId)
      .then((data) => {
        setUserPersonalInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {order && userPersonalInformation && (
        <section className={styles["order-details-section"]}>
          <div className={styles["order-title-content"]}>
            <h4>
              Thank you for your purchase, {userPersonalInformation.firstName}!
            </h4>
          </div>
          <div className={styles["order-details-wrapper"]}>
            <div>
              <p className={styles["order-info"]}>
                Your order{" "}
                <span className={styles["id-span"]}> ID: #{order._id} </span>
                has been successfully placed.
              </p>
              <p className={styles["bottom-paragraph"]}>
                You can find all the details and track the status of your
                purchase in your
                <Link to={"/user/account"}>
                  <button className={styles["order-history-button"]}>
                    Account.
                  </button>
                </Link>
              </p>
              <div className={styles["image-container"]}>
                <img
                  className={styles["image"]}
                  src="https://res.cloudinary.com/deztgvefu/image/upload/v1715634191/template_images/herolarged_ny24_plp_cl_earrings_qswzmg.avif"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
