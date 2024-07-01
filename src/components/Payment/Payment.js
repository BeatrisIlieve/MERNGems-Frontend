import { useService } from "../../hooks/useService";
import { addressInformationServiceFactory } from "../../services/addressInformationService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBagContext } from "../../contexts/BagContext";
import { authServiceFactory } from "../../services/authService";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { AddressInformationFormPopup } from "../User/Account/AccountDetails/AddressInformationFormPopup/AddressInformationFormPopup";
import { CardDetailsForm } from "./CardDetailsForm/CardDetailsForm";
import { LoginPopup } from "../User/Login/LoginPopup/LoginPopup";

export const Payment = () => {
  const { bagItems, totalPrice, totalQuantity, loading } = useBagContext();
  const authService = useService(authServiceFactory);
  const { isAuthenticated, userId } = useAuthContext();
  const [user, setUser] = useState([]);
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
  const [userInformation, setUserInformation] = useState([]);

  const [
    displayAddressInformationFormPopup,
    setDisplayAddressInformationFormPopup,
  ] = useState(false);

  const from = "/user/payment";
  localStorage.setItem("lastLocation", from);

  const popupClickHandler = async () => {
    document.body.style.overflow = "hidden";

    setDisplayAddressInformationFormPopup(true);
  };

  const popupSubmitHandler = async () => {
    document.body.style.overflow = "visible";

    setDisplayAddressInformationFormPopup(false);
  };

  const popupCloseHandler = () => {
    document.body.style.overflow = "visible";

    setDisplayAddressInformationFormPopup(false);
  };

  useEffect(() => {
    authService
      .find(userId)
      .then((dataFromServer) => {
        setUser(dataFromServer);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    addressInformationService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  return (
    <>
      {!isAuthenticated ? (
        <LoginPopup />
      ) : (
        <section className={styles["complete-order-box"]}>
          <div>
            <div className={styles["title-container"]}>
              <h2 className={styles["title"]}>Checkout</h2>
              <div className={styles["title-sub-container"]}>
                <h4 className={styles["main-sub-title"]}>Shipping</h4>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles["arrow"]}
                />
                <h4 className={styles["sub-title"]}>Payment</h4>
              </div>
            </div>
            <div className={styles["complete-order-container"]}>
              <div className={styles["complete-order-left-container"]}>
                <div className={styles["complete-order-left-container-sticky"]}>
                  <div className={styles["left-top-container"]}>
                    <div className={styles["left-top-upper-container"]}>
                      <h4
                        className={styles["left-top-container-title"]}
                        data-testid="shipping-information"
                      >
                        Shipping Information
                      </h4>
                      <button
                        className={styles["left-top-container-edit-button"]}
                        onClick={() => popupClickHandler()}
                      >
                        Edit
                      </button>
                    </div>
                    <div className={styles["left-bottom-sub-container"]}>
                      <h5
                        className={styles["left-bottom-container-email-title"]}
                      >
                        Email
                      </h5>
                      <h4 className={styles["left-bottom-container-email"]}>
                        {user.email}
                      </h4>
                      <div className={styles["bag-left-container-title"]}>
                        <span
                          className={
                            styles["bag-left-container-title-with-padding"]
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTruck}
                            className={styles["delivery-icon"]}
                          />
                        </span>
                        <span className={styles["delivery-title"]}>
                          Delivery
                        </span>
                        <span className={styles["delivery-span"]}>
                          ({totalQuantity}{" "}
                          {totalQuantity > 1 ? "items" : "item"})
                        </span>
                        <h5
                          className={
                            styles["left-bottom-container-email-title"]
                          }
                        >
                          Shipping Address
                        </h5>
                        <ul
                          className={styles["address-information-list"]}
                          role="list"
                        >
                          <li className={styles["address-information-item"]}>
                            {userInformation.firstName}{" "}
                            {userInformation.lastName}
                          </li>
                          <li className={styles["address-information-item"]}>
                            {userInformation.phoneNumber}
                          </li>
                          <li className={styles["address-information-item"]}>
                            {userInformation.country}
                          </li>
                          <li className={styles["address-information-item"]}>
                            {userInformation.city}, {userInformation.zipCode}
                          </li>
                          <li className={styles["address-information-item"]}>
                            {userInformation.street} St.
                          </li>
                          {userInformation.apartment && (
                            <li className={styles["address-information-item"]}>
                              Apt. {userInformation.apartment}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles["left-bottom-container"]}>
                    <h4 className={styles["left-bottom-container-title"]}>
                      Payment
                    </h4>
                    <div className={styles["card-details-container"]}>
                      <CardDetailsForm />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["complete-order-right-container"]}>
                <div
                  className={styles["complete-order-right-container-sticky"]}
                >
                  <h4 className={styles["order-summary-title"]}>
                    Order Summary
                  </h4>
                  <ul role="list">
                    {bagItems.map((item) => (
                      <li
                        key={item._id}
                        className={styles["bag-left-sub-left-container"]}
                      >
                        <OrderSummary {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className={styles["flex-container-line"]}>
                    <hr className={styles["hr-line"]} />
                    <img
                      className={styles["line-img"]}
                      src="https://res.cloudinary.com/deztgvefu/image/upload/v1707499296/template_images/giphy_s_b3cfly_1_b0dwbo.gif"
                      alt=""
                    />
                    <hr className={styles["hr-line"]} />
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {displayAddressInformationFormPopup && (
            <AddressInformationFormPopup
              popupSubmitHandler={() => popupSubmitHandler()}
              popupCloseHandler={() => popupCloseHandler()}
            />
          )}
          {loading && <LoadingSpinner />}
        </section>
      )}
    </>
  );
};
