import styles from "./AddressInformationFormPopup.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { addressInformationServiceFactory } from "../../../../../services/addressInformationService";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";
import { useForm } from "../../../../../hooks/useForm";
import { hasFormErrorOccurred } from "../../../../../utils/hasFormErrorOccurred";

export const AddressInformationFormPopup = ({
  popupSubmitHandler,
  popupCloseHandler,
}) => {
  const { userId } = useAuthContext();
  const addressInformationService = useService(
    addressInformationServiceFactory
  );
  const [userInformation, setUserInformation] = useState([]);

  const {
    values,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    addressInformationService
      .find(userId)
      .then((data) => {
        setUserInformation(data);
        updateForm();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userInformation]);

  const onSubmit = async (e) => {
    submitHandler(e);

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const phoneNumber = values.phoneNumber.fieldValue;
      const country = values.country.fieldValue;
      const city = values.city.fieldValue;
      const street = values.street.fieldValue;
      const apartment = values.apartment.fieldValue;
      const zipCode = values.zipCode.fieldValue;

      const data = {
        phoneNumber,
        country,
        city,
        street,
        apartment,
        zipCode,
      };

      try {
        await addressInformationService.update(userId, data);

        Object.keys(FORM_KEYS).forEach((key) => {
          INITIAL_FORM_VALUES[FORM_KEYS[key]].errorMessage = "";
        });

        popupSubmitHandler();

        updateForm();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        popupCloseHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupCloseHandler]);

  return (
    <section
      className={styles["popup-box"]}
      data-testid="address-information-form-popup"
    >
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-content"]}>
          <div className={styles["modal-header"]}>
            <div
              id={styles["xMark"]}
              onClick={() => popupCloseHandler()}
              data-testid="address-information-form-popup-x-mark"
            >
              <FontAwesomeIcon icon={faXmark} className={styles["x-mark"]} />
            </div>
            <h2 className={styles["title"]}>Add a New Address</h2>
          </div>
          <form
            method="POST"
            onSubmit={onSubmit}
            className={styles["form-container"]}
          >
            <DynamicFormAuthUser
              values={values}
              formKeys={FORM_KEYS}
              clickHandler={clickHandler}
              blurHandler={blurHandler}
              changeHandler={changeHandler}
              initialFormValues={INITIAL_FORM_VALUES}
              userInformation={userInformation}
            />
            <button
              className={`${styles["animated-button"]} ${styles["button"]}`}
              type="submit"
              data-testid="submit"
            >
              Save
            </button>
          </form>
          <button
            className={styles["dismiss-button"]}
            onClick={() => popupCloseHandler()}
            data-testid="address-information-form-popup-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};
