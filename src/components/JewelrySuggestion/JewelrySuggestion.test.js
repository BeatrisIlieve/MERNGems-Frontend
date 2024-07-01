import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { JewelrySuggestion } from "./JewelrySuggestion";
import { useService } from "../../hooks/useService";
import { BrowserRouter as Router } from "react-router-dom";
import { slugify } from "../../utils/slugify";

jest.mock("../../hooks/useService");

const mockJewelrySuggestionService = {
  findAll: jest.fn(),
};

jest.mock("../../utils/slugify", () => ({
  slugify: jest.fn((str) => str.toLowerCase().replace(/ /g, "-")),
}));

describe("JewelrySuggestion component", () => {
  const defaultProps = {
    jewelryId: "123",
  };

  const mockJewelries = [
    {
      _id: "1",
      title: "Beautiful Ring",
      categories: [{ title: "Rings" }],
      firstImageUrl: "image-url-1",
    },
    {
      _id: "2",
      title: "Elegant Necklace",
      categories: [{ title: "Necklaces" }],
      firstImageUrl: "image-url-2",
    },
  ];

  beforeEach(() => {
    useService.mockReturnValue(mockJewelrySuggestionService);

    mockJewelrySuggestionService.findAll.mockResolvedValue(mockJewelries);

    jest.clearAllMocks();
  });

  test("renders suggestion title correctly", async () => {
    render(
      <Router>
        <JewelrySuggestion {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("React Gems Suggests")).toBeInTheDocument();
  });

  test("fetches and displays jewelry suggestions", async () => {
    render(
      <Router>
        <JewelrySuggestion {...defaultProps} />
      </Router>
    );

    await waitFor(() => {
      mockJewelries.forEach((j) => {
        expect(screen.getByText(j.title)).toBeInTheDocument();
        expect(screen.getByAltText(`${j.title}`)).toHaveAttribute(
          "src",
          j.firstImageUrl
        );
      });
    });
  });

  test("renders links with correct URLs", async () => {
    render(
      <Router>
        <JewelrySuggestion {...defaultProps} />
      </Router>
    );

    await waitFor(() => {
      mockJewelries.forEach((j) => {
        const link = screen.getByText(j.title).closest("a");
        const expectedHref = `/${slugify(j.categories[0].title)}/${slugify(
          j.title
        )}/${j._id}`;
        expect(link).toHaveAttribute("href", expectedHref);
      });
    });
  });

  test("handles API errors gracefully", async () => {
    mockJewelrySuggestionService.findAll.mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    render(
      <Router>
        <JewelrySuggestion {...defaultProps} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText("Beautiful Ring")).not.toBeInTheDocument();
      expect(screen.queryByText("Elegant Necklace")).not.toBeInTheDocument();
    });
  });
});
