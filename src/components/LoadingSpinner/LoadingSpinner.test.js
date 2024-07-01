import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  beforeEach(() => {
    render(<LoadingSpinner />);
  });

  it("renders loading spinner with correct elements", () => {
    const spinnerBox = screen.getByTestId("loading-spinner-box");
    const spinner = screen.getByTestId("loading-spinner");
    const logoImage = screen.getByAltText("logo");
    const title = screen.getByText("Loading... !");

    expect(spinnerBox).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
