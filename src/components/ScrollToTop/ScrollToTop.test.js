import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("ScrollToTop Component", () => {
  const mockUseLocation = useLocation;

  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
  });

  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: MemoryRouter });
  };

  test("scrolls to top when pathname changes", () => {
    mockUseLocation.mockReturnValue({ pathname: "/first-path" });

    const { rerender } = renderWithRouter(
      <Routes>
        <Route path="*" element={<ScrollToTop />} />
      </Routes>,
      { route: "/first-path" }
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    mockUseLocation.mockReturnValue({ pathname: "/second-path" });

    rerender(
      <Routes>
        <Route path="*" element={<ScrollToTop />} />
      </Routes>
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
