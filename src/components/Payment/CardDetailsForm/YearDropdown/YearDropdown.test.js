import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { YearDropdown } from "./YearDropdown";

const EXPIRATION_YEAR_ERROR_MESSAGE = "Expiration year is required";

describe("YearDropdown Component", () => {
  const mockSetExpirationYear = jest.fn();
  const mockSetExpirationYearErrorOccurred = jest.fn();

  const renderComponent = (expirationYearErrorOccurred = false) => {
    return render(
      <YearDropdown
        setExpirationYear={mockSetExpirationYear}
        setExpirationYearErrorOccurred={mockSetExpirationYearErrorOccurred}
        expirationYearErrorOccurred={expirationYearErrorOccurred}
      />
    );
  };

  test("renders correctly", () => {
    renderComponent();

    expect(screen.getByText("YY *")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-toggle-year")).toBeInTheDocument();
  });

  test("toggles dropdown menu on button click", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-year");
    fireEvent.click(button);

    expect(screen.getByTestId("dropdown-menu-year")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByTestId("dropdown-menu-year")).not.toBeInTheDocument();
  });

  test("selects a year and closes dropdown", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-year");
    fireEvent.click(button);

    const year = new Date().getFullYear().toString();
    fireEvent.click(screen.getByTestId(`year-option-${year}`));

    expect(mockSetExpirationYear).toHaveBeenCalledWith(year);
    expect(mockSetExpirationYearErrorOccurred).toHaveBeenCalledWith(false);
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(screen.queryByTestId("dropdown-menu-year")).not.toBeInTheDocument();
  });

  test("displays error message when expirationYearErrorOccurred is true", () => {
    renderComponent(true);

    expect(screen.getByTestId("error-message-year")).toHaveTextContent(
      EXPIRATION_YEAR_ERROR_MESSAGE
    );
  });

  test("closes dropdown when clicking outside", () => {
    renderComponent();

    const button = screen.getByTestId("dropdown-toggle-year");
    fireEvent.click(button);

    expect(screen.getByTestId("dropdown-menu-year")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByTestId("dropdown-menu-year")).not.toBeInTheDocument();
  });
});
