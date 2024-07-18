<a name="js-gems"></a>

<p align="center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 120px;">
  <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1719057213/template_images/Screenshot_2024-06-22_at_14.52.43_xrdvgt.png" alt="Project Logo" width="340">
</p>

---

### <p align="center"> *Visit our online store at: https://mern-gems-boutique.web.app* </p>

---

<a name="built-with"></a>
<a name="error-handling"></a>


<h4 align="center">
  <a href="#introduction">Introduction</a> ·
  <a href="#demo-video">Demo Video</a> ·
  <a href="#built-with">Built With</a> ·
  <a href="#testing">Testing</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#error-handling">Error Handling</a> ·
  <a href="#features">Features</a> ·
  <a href="#backend">Backend</a> 
</h4>

---
## Introduction
<p><i>Welcome to our Online Jewelry Store! This web application serves as a platform for showcasing and selling a stunning collection of exquisite jewelry.</i></p>

## Demo Video

[![Watch the video](https://img.youtube.com/vi/MBGi5NiVf_8/maxresdefault.jpg)](https://www.youtube.com/watch?v=MBGi5NiVf_8)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Built With
- React
- CSS Modules
> [!NOTE]
> Currently optimized for desktop; future plans include implementing media queries for responsiveness on various devices

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Testing
- Jest

[![Coverage Status](https://img.shields.io/badge/coverage-63%25-brightgreen.svg)](https://github.com/BeatrisIlieve/MERNGems-Frontend/blob/main/testCoverageReport/index.html)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Deployment
- Firebase
- GitHub Actions
- Docker Hub

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Error Handling
1. Input Validation
- All user inputs are validated using regular expressions (regex)
- The validation rules are centralized in a set of constants and utility functions
- DynamicForm component and a useForm hook are used to handle user inputs
- Real-time feedback that ensures all data entered meets the required criteria before submission

2. User Authentication
- Register Error Handling:
  - When a user tries to register, the application verifies the email against the database
  - If the email is already registered, an error message is displayed to notify the user
- Login Error Handling:
  - When a user tries to log in, the application verifies the email and password against the database
  - If the password is invalid or there is no user with the provided email, an error message is displayed to notify the user
- Success Message:
  - If a user password is successfully changed, a success message is displayed

3. Size Selection
- If a user clicks the "Add To Bag" button without selecting a size, an error message is displayed to inform them of the requirement

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Features
#### 1. Custom Forms
   
- Floating labels
  
- Validation Messages
  
- Dropdown Menus for card expiration month and card expiration year
  - The menus suggest only valid options to ensure that the user cannot select an invalid expiration date
  
- After submitting any of the forms, the backend also performs validation to ensure that all inputs, including menus and fields, offer only valid options
  
- Errors related to invalid inputs returned by the backend are displayed to the user

#### Technical Implementation for Update Password Form

1. Constants and regular expressions:

```javascript
const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 255,
};

export const PASSWORD_PATTERN = new RegExp(
  `^(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[0-9]{1})[A-Za-z0-9]{${PASSWORD_LENGTH.MIN},${PASSWORD_LENGTH.MAX}}$`
);
const PASSWORD_ERROR_MESSAGE = `* Password must be ${PASSWORD_LENGTH.MIN}-${PASSWORD_LENGTH.MAX} characters and include at least one lowercase letter, one uppercase letter, and one digit`;

const PASSWORD_MISMATCH_ERROR_MESSAGE =
  "* Ensure that both password fields contain the same password";

const PASSWORD_SUCCESS_MESSAGE = "Your password has been changed successfully";
```

2. Each form has its own Initial Form Values in order to achieve the dynamic behaviour:

```javascript
import { PASSWORD_PATTERN } from "../../../../../constants/forms";

const FORM_KEYS = {
  Password: "password",
  NewPassword: "newPassword",
  RetypeNewPassword: "retypeNewPassword",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.Password]: {
    fieldLabel: "Current Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "password",
    validTestData: "123456Tt",
    invalidTestData: "12345678",
    emptyTestData: "",
    differentPasswordsTestData: "123456Tt",
  },
  
  [FORM_KEYS.NewPassword]: {
    fieldLabel: "New Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    successMessage: "",
    isFocused: false,
    fieldType: "password",
    validTestData: "123456Tt",
    invalidTestData: "12345678",
    emptyTestData: "",
    differentPasswordsTestData: "123456Tt",
  },

  [FORM_KEYS.RetypeNewPassword]: {
    fieldLabel: "Confirm Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "password",
    validTestData: "123456Tt",
    invalidTestData: "12345678",
    emptyTestData: "",
    differentPasswordsTestData: "123456Ty",
  },
};

export { FORM_KEYS };
```

3. Util functions for pattern validation:
``` javascript
import { ERROR_MESSAGES } from "../constants/forms";

const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const getPatternErrorMessage = (field, value, pattern) => {
  if (!isValid(value, pattern)) {
    return ERROR_MESSAGES[field];
  } else {
    return "";
  }
};
```
4. useForm hook:
```javascript
import { useState } from "react";
import { getPatternErrorMessage } from "../utils/getPatternErrorMessage";

export const useForm = (INITIAL_FORM_VALUES) => {
  const [values, setValues] = useState(INITIAL_FORM_VALUES);

  const updateForm = () => {
    Object.keys(values).forEach((fieldKey) => {
      const input = document.getElementById(fieldKey);

      if (input && input.value !== "") {
        setValues((prevValues) => ({
          ...prevValues,
          [fieldKey]: {
            ...prevValues[fieldKey],
            fieldValue: input.value,
            isFocused: true,
          },
        }));
      }
    });
  };

  const clickHandler = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], isFocused: true },
    }));
  };

  const blurHandler = (fieldKey) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: {
        ...prevValues[fieldKey],
        isFocused: prevValues[fieldKey].fieldValue !== "",
      },
    }));
  };

  const changeHandler = (fieldKey, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: { ...prevValues[fieldKey], fieldValue: newValue },
    }));
    updateForm();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    Object.keys(values).forEach((key) => {
      const field = values[key];

      field.errorMessage = getPatternErrorMessage(
        key,
        field.fieldValue,
        field.regexPattern
      );
    });
  };

  return {
    values,
    setValues,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  };
};
```
5. If not pattern error ocurred, a util function checks for password mismatch:

```javascript
import { ERROR_MESSAGES } from "../constants/forms";

export const getPasswordMismatchErrorMessage = (password, retypePassword) => {
  if (password !== retypePassword) {
    return ERROR_MESSAGES.passwordMismatch;
  } else {
    return "";
  }
};
```

6. The DynamicForm component:
- Incorporates client-side validation and displays error messages for password mismatches and server errors
- Renders form fields dynamically based on user information and initial form values

```javascript
import styles from "./DynamicForm.module.css";

export const DynamicFormAuthUser = ({
  values,
  formKeys,
  clickHandler,
  blurHandler,
  changeHandler,
  initialFormValues,
  userInformation,
}) => {
  return (
    <>
      {Object.entries(formKeys).map(([key, value]) => (
        <div key={key} className={styles["field-box"]}>
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
              defaultValue={userInformation[value]}
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
```

7. PasswordInformationForm component:
- Uses the `useForm` hook to manage form state, including field values, error messages, and success messages
- Utilizes the `loginInformationService` to interact with the backend for fetching and updating user information

```javascript
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import { useService } from "../../../../../hooks/useService";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";
import { getPasswordMismatchErrorMessage } from "../../../../../utils/getPasswordMismatchErrorMessage";
import { SUCCESS_MESSAGES } from "../../../../../constants/forms";
import { INITIAL_FORM_VALUES, FORM_KEYS } from "./initialFormValues";
import { DynamicFormAuthUser } from "../../../../DynamicForm/DynamicFormAuthUser";
import { useForm } from "../../../../../hooks/useForm";
import { hasFormErrorOccurred } from "../../../../../utils/hasFormErrorOccurred";
import styles from "../AccountDetails.module.css";

export const PasswordInformationForm = () => {
  const { userId } = useAuthContext();
  const loginInformationService = useService(loginInformationServiceFactory);
  const [userInformation, setUserInformation] = useState([]);

  const {
    values,
    setValues,
    updateForm,
    clickHandler,
    blurHandler,
    changeHandler,
    submitHandler,
  } = useForm(INITIAL_FORM_VALUES);

  useEffect(() => {
    loginInformationService
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

    const updatedValues = { ...values };

    if (
      updatedValues[FORM_KEYS.NewPassword].errorMessage === "" ||
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage === ""
    ) {
      const passwordErrorMessage = getPasswordMismatchErrorMessage(
        values[FORM_KEYS.NewPassword].fieldValue,
        values[FORM_KEYS.RetypeNewPassword].fieldValue
      );

      updatedValues[FORM_KEYS.NewPassword].errorMessage = passwordErrorMessage;
      updatedValues[FORM_KEYS.RetypeNewPassword].errorMessage =
        passwordErrorMessage;
    }

    setValues(updatedValues);
    updateForm();

    const errorOccurred = hasFormErrorOccurred(values);

    if (!errorOccurred) {
      const password = values.password.fieldValue;
      const newPassword = values.newPassword.fieldValue;

      const data = { password, newPassword };
      try {
        await loginInformationService.updatePassword(userId, data);

        setValues((prevValues) => ({
          ...prevValues,
          [FORM_KEYS.NewPassword]: {
            ...prevValues[FORM_KEYS.NewPassword],
            successMessage: SUCCESS_MESSAGES.newPassword,
          },
        }));

        updateForm();
      } catch (err) {
        console.log(err.message);

        setValues((prevValues) => ({
          ...prevValues,
          [FORM_KEYS.Password]: {
            ...prevValues[FORM_KEYS.Password],
            errorMessage: err.message,
          },
        }));

        updateForm();
      }
    }
    values[FORM_KEYS.NewPassword].successMessage = "";
  };

  return (
    <section className={styles["slideIn"]}>
      <form
        method="POST"
        onSubmit={onSubmit}
        data-testid="update-password-form"
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
    </section>
  );
};
```

#### 2. JSON Web Token expiration (adjusted JWT token expiration to 10 seconds for demo video to showcase Login Popup; reset to 10 minutes and rebuilt app afterwards)
- The application tracks user activity, including keyboard inputs, clicks, and scrolling
- If no activity is detected for 10 minutes, the user is automatically logged out
- On the payment page, a popup informs the user that their session has expired. The popup includes a button to go to the login page. After logging in, the user is redirected back to the payment page to continue their transaction
- On pages other than the payment page, the user is logged out and redirected to the login page

#### 3. Load More Functionality in the `JewelryList` and `Wishlist` components
- When a component mounts, it fetches items based on the user selection - category or collection. The first subset of items, based on a predefined number, is displayed initially
- A "Load More" button is displayed at the bottom of the item list. Clicking the button triggers a `loadMoreHandler` function, which updates the number of items displayed
- The `loadMoreHandler` function increments the number of displayed items. When all items are displayed, the "Load More" button disappears

#### 4. Product filtration
- Utilizes DynamicDropdown components for selecting stone types and stone colors
- Implements changeHandler and submitHandler functions to respond to user selections and apply filters accordingly
- Offers clearFilter functionality to reset filters and update the displayed jewelry items based on user actions
- Provides visual indicators (isSelectedStoneType, isSelectedStoneColor) to highlight whether a stone type or stone color filter is active

#### 5. Product sorting
- Sorts items based on their current availability
- Arranges items in ascending order of price
- Arranges items in descending order of price
- Visual feedback is provided with a highlighted indicator next to the selected sorting option

#### 6. Toggle Like
- Allows users to toggle their liking status by clicking a heart icon associated with each jewelry item
- Utilizes useWishlistContext to access functions for adding and removing items from the wishlist
- Toggles the `isLikedByUser` state locally for immediate visual feedback

#### 7. Mini Bag
- Sets lastLocation in localStorage to "/user/shopping-bag" to track navigation and redirect unauthenticated users to their shopping bag after login
- Contains a miniBagRef to manage the reference to the mini bag's modal content, allowing the user to close the modal by clicking outside of it
- Provides buttons for "View Bag" and "Continue Checkout", which are links that navigate to the full shopping bag page and the checkout page, respectively
- Includes a close button (X mark) that allows users to close the mini bag
- Allows the user to increase or decrease the quantity of items. Additionally, the buttons for adjusting the quantity are styled to appear active or inactive based on the available stock. A remove button is also provided

#### 8. Authentication Required for Checkout
- If the user is not logged in and clicks the checkout button, they are redirected to the login page
- Upon successful login, they are then redirected back to the checkout page to complete their purchase

#### 9. Mini Navigation
- The component uses state variables (isScrolled, isScrollingUp, lastScrollY) to detect scroll direction and position
- When the user scrolls down, a minimized MiniHeader component is displayed
- Conversely, when the user scrolls up, the full header component with comprehensive navigation options is shown

#### 10. Search Box Popup

#### 11. Shopping Bag Count

#### 12. Wishlist Count

#### 13. Products Count

#### 14. Create/Update Personal Information Form

#### 15. Create/Update Shipping Information Form

#### 16. Update Password Form

#### 17. Update Email Form

#### 18. Logout Button

#### 19. Delete Account Popup

#### 20. Order Summary at every step of the Checkout process

#### 21. Order Confirmation Page

#### 22. Order History Page

#### 23. Route Guard 

#### 24. `ScrollToTop` component that ensures the window scrolls to the top of the page whenever the user navigates to a new route
  
<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Backend
- Built with Node.js, Express.js and MondoDB

#### *Find the Backend Repository [**HERE**](https://github.com/BeatrisIlieve/MERNGems-Backend)*

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>
