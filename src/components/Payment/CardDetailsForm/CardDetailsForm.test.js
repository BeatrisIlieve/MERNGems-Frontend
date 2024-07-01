import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CardDetailsForm } from "./CardDetailsForm";
import { AuthContext } from "../../../contexts/AuthContext";
import { BagContext } from "../../../contexts/BagContext";
import { paymentServiceFactory } from "../../../services/paymentService";
import { ERROR_MESSAGES } from "../../../constants/forms";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../services/paymentService", () => ({
  paymentServiceFactory: jest.fn(),
}));

const mockConfirm = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CardDetailsForm", () => {
  beforeEach(() => {
    paymentServiceFactory.mockReturnValue({
      confirm: mockConfirm,
    });
  });

  const userId = "test-user-id";
  const totalPrice = 100;

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <AuthContext.Provider value={{ userId }}>
        <BagContext.Provider value={{ totalPrice }}>
          <MemoryRouter>
            <CardDetailsForm />
          </MemoryRouter>
        </BagContext.Provider>
      </AuthContext.Provider>
    );
  });

  test("Submits the form with valid values; Don't expect errors", async () => {
    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent("");
    });
  });

  test("Submits the form with invalid values; Expect errors", async () => {
    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].invalidTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with empty values; Expect errors", async () => {
    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].emptyTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });
});
