import React from "react";
import { render, screen } from "@testing-library/react";
import { JewelryCard } from "./JewelryCard";

describe("JewelryCard", () => {
  test("renders jewelry card correctly when not sold out", () => {
    const jewelryData = {
      firstImageUrl: "image.jpg",
      jewelryTitle: "Test Jewelry",
      isSoldOut: false,
    };

    render(<JewelryCard {...jewelryData} />);

    const jewelryImage = screen.getByAltText("Test Jewelry");
    expect(jewelryImage).toBeInTheDocument();
    expect(jewelryImage).toHaveAttribute("src", "image.jpg");

    expect(screen.queryByText("SOLD OUT")).toBeNull();
  });

  test("renders jewelry card correctly when sold out", () => {
    const jewelryData = {
      firstImageUrl: "image.jpg",
      jewelryTitle: "Test Jewelry",
      isSoldOut: true,
    };

    render(<JewelryCard {...jewelryData} />);

    const jewelryImage = screen.getByAltText("Test Jewelry");
    expect(jewelryImage).toBeInTheDocument();
    expect(jewelryImage).toHaveAttribute("src", "image.jpg");

    expect(screen.getByText("SOLD OUT")).toBeInTheDocument();
  });
});
