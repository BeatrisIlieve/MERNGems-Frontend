import { useEffect } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from "../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { useForm } from "../../../../hooks/useForm";
import { DynamicFormNotAuthUser } from "../../../DynamicForm/DynamicFormNotAuthUser";
import { hasFormErrorOccurred } from "../../../../utils/hasFormErrorOccurred";
import styles from "../Login.module.css";

export const LoginForm = () => {
  const { onLoginSubmit } = useContext(AuthContext);

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
    setValues(updatedValues);

    updateForm();

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const email = values.email.fieldValue;
      const password = values.password.fieldValue;

      const data = { email, password };

      try {
        await onLoginSubmit(data);
      } catch (err) {
        if (err.message === INVALID_CREDENTIALS_ERROR_MESSAGE) {
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
          Sign In
        </button>
      </form>
    </section>
  );
};
