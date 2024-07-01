import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MonthDropdown } from "./MonthDropdown";

const EXPIRATION_MONTH_ERROR_MESSAGE = "Expiration month is required";

describe("MonthDropdown Component", () => {
  const mockSetExpirationMonth = jest.fn();
  const mockSetExpirationMonthErrorOccurred = jest.fn();

  const renderComponent = (expirationMonthErrorOccurred = false) => {
    return render(
      <MonthDropdown
        setExpirationMonth={mockSetExpirationMonth}
        setExpirationMonthErrorOccurred={mockSetExpirationMonthErrorOccurred}
        expirationMonthErrorOccurred={expirationMonthErrorOccurred}
      />
    );
  };

  test("renders correctly", () => {
    renderComponent();

    expect(screen.getByText("MM *")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-toggle-month")).toBeInTheDocument();
  });

  test("toggles dropdown menu on button click", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-month");
    fireEvent.click(button);

    expect(screen.getByTestId("dropdown-menu-month")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId("dropdown-menu-month")).not.toBeInTheDocument();
  });

  test("selects a month and closes dropdown", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-month");
    fireEvent.click(button);

    const month = (new Date().getMonth() + 2).toString().padStart(2, "0");
    fireEvent.click(screen.getByTestId(`month-option-${month}`));

    expect(mockSetExpirationMonth).toHaveBeenCalledWith(month);
    expect(mockSetExpirationMonthErrorOccurred).toHaveBeenCalledWith(false);
    expect(screen.getByText(month)).toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-menu-month")).not.toBeInTheDocument();
  });

  test("displays error message when expirationMonthErrorOccurred is true", () => {
    renderComponent(true);

    expect(screen.getByTestId("error-message-month")).toHaveTextContent(
      EXPIRATION_MONTH_ERROR_MESSAGE
    );
  });

  test("closes dropdown when clicking outside", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-month");
    fireEvent.click(button);

    expect(screen.getByTestId("dropdown-menu-month")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByTestId("dropdown-menu-month")).not.toBeInTheDocument();
  });
});
