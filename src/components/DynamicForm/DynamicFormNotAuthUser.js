import styles from "./DynamicForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { QuestionMarkEmailRegister } from "./QuestionMarkEmailRegister/QuestionMarkEmailRegister";
import { useState } from "react";

export const DynamicFormNotAuthUser = ({
  values,
  formKeys,
  clickHandler,
  blurHandler,
  changeHandler,
  initialFormValues,
}) => {
  const [hoveredQuestionMarkEmail, setHoveredQuestionMarkEmail] =
    useState(false);

  const onHoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(true);
  };

  const onUnhoverQuestionMarkEmail = () => {
    setHoveredQuestionMarkEmail(false);
  };

  return (
    <>
      {Object.entries(formKeys).map(([key, value]) => (
        <div key={key} className={styles["field-box"]}>
          {key === "Email" && (
            <span>
              <>{hoveredQuestionMarkEmail && <QuestionMarkEmailRegister />}</>
              <FontAwesomeIcon
                icon={faQuestion}
                className={styles["input-icon"]}
                onMouseEnter={() => onHoverQuestionMarkEmail()}
                onMouseLeave={() => onUnhoverQuestionMarkEmail()}
              />
            </span>
          )}
          <div
            className={`${styles["field-container"]} ${
              values[value].errorMessage !== "" ? styles["error"] : ""
            }`.trim()}
            onClick={() => clickHandler(value)}
            onBlur={() => blurHandler(value)}
          >
            <input
              type={values[value].fieldType}
              name={value}
              id={value}
              value={values[key]}
              onChange={(e) => changeHandler(value, e.target.value)}
              onFocus={() => clickHandler(value)}
              data-testid={`${value}-input`}
              className={styles["password"]}
            />
            <label
              htmlFor={value}
              className={`${styles["label"]} ${
                values[value].isFocused === true ? styles["isFocused"] : ""
              }`.trim()}
            >
              {initialFormValues[value].fieldLabel}
            </label>
          </div>
          <div
            className={styles["error-message"]}
            data-testid={`${value}-error`}
          >
            {values[value].errorMessage}
          </div>
          <div
            className={styles["success-message"]}
            data-testid={`${value}-success`}
          >
            {values[value].successMessage}
          </div>
        </div>
      ))}
    </>
  );
};
