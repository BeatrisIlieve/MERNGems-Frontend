import styles from "./Account.module.css";
import { useState, useEffect } from "react";
import { useService } from "../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { AccountDetails } from "./AccountDetails/AccountDetails";
import { OrderHistory } from "./OrderHistory/OrderHistory";

const SUB_MENU_OPTIONS = {
  AccountDetails: "accountDetails",
  OrderHistory: "orderHistory",
};

export const Account = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
  );
  const [userPersonalInformation, setUserPersonalInformation] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState(
    SUB_MENU_OPTIONS.AccountDetails
  );

  const from = "/user/account";
  localStorage.setItem("lastLocation", from);

  const switchSubmenuHandler = (option) => {
    setSelectedSubMenu(option);
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
  }, [userPersonalInformation]);

  return (
    <section className={styles["account-box"]}>
      <div className={styles["top-container"]}>
        <h2 className={styles["title"]} data-testid="title-element">
          Hi, {userPersonalInformation.firstName}
        </h2>
        <p className={styles["paragraph"]} data-testid="paragraph-element">
          You can access all your previous orders, set default shipping
          addresses for faster checkout as well as save items to your wishlist
          for quick access.
        </p>
      </div>
      <div className={styles["sub-nav"]}>
        <h3
          className={`${styles["sub-nav-title"]} ${
            selectedSubMenu === SUB_MENU_OPTIONS.AccountDetails
              ? styles["selected"]
              : ""
          }`.trim()}
          onClick={() => switchSubmenuHandler(SUB_MENU_OPTIONS.AccountDetails)}
          data-testid="account-details-title-element"
        >
          Account Details
        </h3>
        <h3
          className={`${styles["sub-nav-title"]} ${
            selectedSubMenu === SUB_MENU_OPTIONS.OrderHistory
              ? styles["selected"]
              : ""
          }`.trim()}
          onClick={() => switchSubmenuHandler(SUB_MENU_OPTIONS.OrderHistory)}
          data-testid="order-history-title-element"
        >
          Order History
        </h3>
      </div>
      <div
        className={styles["bottom-container"]}
        data-testid="bottom-container-element"
      >
        {selectedSubMenu === SUB_MENU_OPTIONS.AccountDetails && (
          <AccountDetails />
        )}
        {selectedSubMenu === SUB_MENU_OPTIONS.OrderHistory && (
          <OrderHistory firstName={userPersonalInformation.firstName} />
        )}
      </div>
    </section>
  );
};
