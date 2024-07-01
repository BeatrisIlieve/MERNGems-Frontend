import React from "react";
import { render, screen } from "@testing-library/react";
import { FooterJewelryList } from "./FooterJewelryList";
import { FOOTERS_BY_TITLE } from "../../../constants/footers";

describe("FooterJewelryList", () => {
  test("renders correctly with valid entityTitle", () => {
    const entityTitle = "Sparkling Cluster";

    render(<FooterJewelryList entityTitle={entityTitle} />);

    const imgElement = screen.getByAltText("Img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", FOOTERS_BY_TITLE[entityTitle][0]);

    const titleElement = screen.getByText(
      `${FOOTERS_BY_TITLE[entityTitle][3]} Collection`
    );
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByText(FOOTERS_BY_TITLE[entityTitle][1]);
    expect(paragraphElement).toBeInTheDocument();
  });
});
