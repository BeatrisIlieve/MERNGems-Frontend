import { PersonalInformationForm } from "./PersonalInformationForm/PersonalInformationForm";
import { AddressInformationFormPopup } from "./AddressInformationFormPopup/AddressInformationFormPopup";
import styles from "./AccountDetails.module.css";
import { EmailInformationForm } from "./EmailInformationForm/EmailInformationForm";
import { PasswordInformationForm } from "./PasswordInformationForm/PasswordInformationForm";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useService } from "../../../../hooks/useService";
import { DeleteAccountPopup } from "./DeleteAccountPopup/DeleteAccountPopup";
import { loginInformationServiceFactory } from "../../../../services/loginInformationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const POPUP_OPTIONS = {
  Delete: "delete",
  Address: "address",
};

export const AccountDetails = () => {
  const { userId, onDelete, onLogout } = useAuthContext();
  const [userInformation, setUserInformation] = useState([]);
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const loginInformationService = useService(loginInformationServiceFactory);

  const [displayDeleteAccountPopup, setDisplayDeleteAccountPopup] =
    useState(false);

  const [
    displayAddressInformationFormPopup,
    setDisplayAddressInformationFormPopup,
  ] = useState(false);

  useEffect(() => {
    loginInformationService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  const onUpdateEmailClick = async () => {
    setShowUpdateEmail(true);
    setShowUpdatePassword(false);
  };

  const onUpdatePasswordClick = async () => {
    setShowUpdatePassword(true);
    setShowUpdateEmail(false);
  };

  const popupClickHandler = async (popupOption) => {
    document.body.style.overflow = "hidden";

    if (popupOption === POPUP_OPTIONS.Delete) {
      setDisplayDeleteAccountPopup(true);
    } else if (popupOption === POPUP_OPTIONS.Address) {
      setDisplayAddressInformationFormPopup(true);
    }
  };

  const popupSubmitHandler = async (popupOption) => {
    document.body.style.overflow = "visible";

    if (popupOption === POPUP_OPTIONS.Delete) {
      setDisplayDeleteAccountPopup(false);

      await onDelete();
    } else if (popupOption === POPUP_OPTIONS.Address) {
      setDisplayAddressInformationFormPopup(false);
    }
  };

  const popupCloseHandler = (popupOption) => {
    document.body.style.overflow = "visible";

    if (popupOption === POPUP_OPTIONS.Delete) {
      setDisplayDeleteAccountPopup(false);
    } else if (popupOption === POPUP_OPTIONS.Address) {
      setDisplayAddressInformationFormPopup(false);
    }
  };

  return (
    <section className={styles["account-details-box"]}>
      <div className={styles["left-container"]}>
        <div className={styles["left-top-container"]}>
          <h2
            className={styles["form-title"]}
            data-testid="personal-information-title"
          >
            Personal Information
          </h2>
          <PersonalInformationForm />
        </div>
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["right-top-container"]}>
          <h2 className={styles["form-title-login-information"]}>
            Account Management
          </h2>
          <h4 className={styles["form-sub-title"]}>Email Address</h4>
          <p className={styles["email"]} data-testid="user-email">
            {userInformation.email}
          </p>
          <div className={styles["button-container"]}>
            <button
              className={styles["button"]}
              onClick={() => onUpdateEmailClick()}
              data-testid="update-email-button"
            >
              Update Email Address
            </button>
            <button
              className={styles["button"]}
              onClick={() => onUpdatePasswordClick()}
              data-testid="update-password-button"
            >
              Change Password
            </button>
            <button
              className={styles["button"]}
              onClick={onLogout}
              data-testid="logout-button"
            >
              Logout
            </button>
            <button
              className={styles["button"]}
              onClick={() => popupClickHandler(POPUP_OPTIONS.Delete)}
              data-testid="delete-account-button"
            >
              Delete Account
            </button>
            {displayDeleteAccountPopup && (
              <DeleteAccountPopup
                popupSubmitHandler={() =>
                  popupSubmitHandler(POPUP_OPTIONS.Delete)
                }
                popupCloseHandler={() =>
                  popupCloseHandler(POPUP_OPTIONS.Delete)
                }
              />
            )}
          </div>
          {showUpdateEmail && <EmailInformationForm />}
          {showUpdatePassword && <PasswordInformationForm />}
        </div>
        <div className={styles["right-bottom-container"]}>
          <section className={styles["address-container"]}>
            <h2 className={styles["form-title-address"]}>Address Book</h2>
            <button
              className={styles["address-button"]}
              onClick={() => popupClickHandler(POPUP_OPTIONS.Address)}
              data-testid="add-address-book-button"
            >
              <FontAwesomeIcon
                icon={faCirclePlus}
                className={styles["address-icon"]}
              />
              <span className={styles["address-title"]}>Add a New Address</span>
            </button>
            {displayAddressInformationFormPopup && (
              <AddressInformationFormPopup
                popupSubmitHandler={() =>
                  popupSubmitHandler(POPUP_OPTIONS.Address)
                }
                popupCloseHandler={() =>
                  popupCloseHandler(POPUP_OPTIONS.Address)
                }
              />
            )}
          </section>
        </div>
      </div>
    </section>
  );
};
