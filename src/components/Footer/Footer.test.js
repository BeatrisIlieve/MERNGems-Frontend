import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  test("renders footer with correct content", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "© 2024 MERN Gems | Beatris Ilieve | beatrisilieve@icloud.com"
      )
    ).toBeInTheDocument();
  });
});
