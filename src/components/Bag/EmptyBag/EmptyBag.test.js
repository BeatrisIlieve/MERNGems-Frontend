import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmptyBag } from "./EmptyBag";
import { HEROES_BY_TITLE } from "../../../constants/heroes";

describe("EmptyBag Component", () => {
  it("renders correctly with heading, paragraph, and links", () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <EmptyBag />
      </MemoryRouter>
    );

    const heading = getByText("Your Shopping Bag is Empty.");
    const paragraph = getByText("Explore and add something you love.");
    const links = getAllByRole("link");

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(links.length).toBe(Object.keys(HEROES_BY_TITLE).length);

    Object.keys(HEROES_BY_TITLE).forEach((title, index) => {
      const link = links[index];
      expect(link).toHaveAttribute("href", HEROES_BY_TITLE[title][2]);
      expect(link).toContainHTML(title);
    });
  });
});
