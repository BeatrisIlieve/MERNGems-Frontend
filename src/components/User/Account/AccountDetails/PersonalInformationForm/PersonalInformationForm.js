import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { personalInformationServiceFactory } from "../../../../../services/personalInformationService";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../../hooks/useForm";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";
import { hasFormErrorOccurred } from "../../../../../utils/hasFormErrorOccurred";
import styles from "../AccountDetails.module.css";

export const PersonalInformationForm = () => {
  const { userId } = useAuthContext();
  const personalInformationService = useService(
    personalInformationServiceFactory
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
    personalInformationService
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
    console.log("here");
    submitHandler(e);

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;
      const birthday = values.birthday.fieldValue;
      const specialDay = values.specialDay.fieldValue;

      const data = { firstName, lastName, birthday, specialDay };
      try {
        await personalInformationService.update(userId, data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <section>
      <form method="POST" onSubmit={onSubmit}>
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
    </section>
  );
};
