import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LocationPopup } from "./LocationPopup";

describe("LocationPopup Component", () => {
  test("renders LocationPopup component", () => {
    const popupCloseHandler = jest.fn();
    const { getByText, getByTestId } = render(
      <LocationPopup popupCloseHandler={popupCloseHandler} />
    );

    expect(getByText("Location and Contact Information")).toBeInTheDocument();

    const closeButton = getByTestId("delete-account-popup-x-mark");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(popupCloseHandler).toHaveBeenCalledTimes(1);
  });

  test("closes popup on Escape key press", () => {
    const popupCloseHandler = jest.fn();
    render(<LocationPopup popupCloseHandler={popupCloseHandler} />);

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(popupCloseHandler).toHaveBeenCalledTimes(1);
  });
});
