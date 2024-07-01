import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchBoxPopup } from "./SearchBoxPopup";
import { searchServiceFactory } from "../../../services/searchService";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const userId = "user-id";

const mockAuthContextValue = {
  userId: userId,
};

jest.mock("../../../services/searchService", () => ({
  searchServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();

describe("SearchBoxPopup", () => {
  beforeEach(() => {
    searchServiceFactory.mockReturnValue({
      findAll: mockFind,
    });
  });

  test("renders the search box and close button", () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <SearchBoxPopup popupCloseHandler={() => {}} />
        </Router>
      </AuthContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    const closeButton = screen.getByTestId("x-mark");
    expect(closeButton).toBeInTheDocument();
  });
});
