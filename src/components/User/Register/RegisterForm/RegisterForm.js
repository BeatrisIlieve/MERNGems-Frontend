import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import { getEmailMismatchErrorMessage } from "../../../../utils/getEmailMismatchErrorMessage";
import { getPasswordMismatchErrorMessage } from "../../../../utils/getPasswordMismatchErrorMessage";
import { EMAIL_ALREADY_EXISTS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../hooks/useForm";
import { DynamicFormNotAuthUser } from "../../../DynamicForm/DynamicFormNotAuthUser";
import { hasFormErrorOccurred } from "../../../../utils/hasFormErrorOccurred";
import styles from "../Register.module.css";

export const RegisterForm = () => {
  const { onRegisterSubmit } = useContext(AuthContext);

  let {
    values,
    setValues,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    updateForm();
  }, []);

  const onSubmit = async (e) => {
    submitHandler(e);

    const updatedValues = { ...values };

    if (
      updatedValues[FORM_KEYS.Email].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypeEmail].errorMessage === ""
    ) {
      const emailErrorMessage = getEmailMismatchErrorMessage(
        updatedValues[FORM_KEYS.Email].fieldValue,
        updatedValues[FORM_KEYS.RetypeEmail].fieldValue
      );

      updatedValues[FORM_KEYS.Email].errorMessage = emailErrorMessage;
      updatedValues[FORM_KEYS.RetypeEmail].errorMessage = emailErrorMessage;
    }

    if (
      updatedValues[FORM_KEYS.Password].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypePassword].errorMessage === ""
    ) {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.Password].fieldValue,
        values[FORM_KEYS.RetypePassword].fieldValue
      );

      updatedValues[FORM_KEYS.Password].errorMessage = passwordErrorMessage;
      updatedValues[FORM_KEYS.RetypePassword].errorMessage =
        passwordErrorMessage;
    }

    setValues(updatedValues);
    updateForm();

    const errorOccurred = hasFormErrorOccurred(updatedValues);

    if (!errorOccurred) {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;
      const firstName = values.firstName.fieldValue;
      const lastName = values.lastName.fieldValue;

      const data = { email, password, firstName, lastName };
      try {
        await onRegisterSubmit(data);
      } catch (err) {
        if (err.message === EMAIL_ALREADY_EXISTS_ERROR_MESSAGE) {
          setValues((prevValues) => ({
            ...prevValues,
            [FORM_KEYS.Email]: {
              ...prevValues[FORM_KEYS.Email],
              errorMessage: err.message,
            },
          }));

          updateForm();
        }
      }
    }
  };

  return (
    <section>
      <form method="POST" onSubmit={onSubmit}>
        <DynamicFormNotAuthUser
          values={values}
          formKeys={FORM_KEYS}
          clickHandler={clickHandler}
          blurHandler={blurHandler}
          changeHandler={changeHandler}
          initialFormValues={INITIAL_FORM_VALUES}
        />
        <button
          className={`${styles["animated-button"]} ${styles["button"]}`}
          type="submit"
          data-testid="submit"
        >
          Create an account
        </button>
      </form>
    </section>
  );
};
