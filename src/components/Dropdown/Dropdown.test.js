import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

describe("Dropdown Component", () => {
  const label = "Dropdown Label";
  const subLabel = "Dropdown SubLabel";
  const children = <div>Dropdown Content</div>;

  beforeEach(() => {
    render(
      <Dropdown label={label} subLabel={subLabel}>
        {children}
      </Dropdown>
    );
  });

  test("renders correctly with label and subLabel", () => {
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(subLabel)).toBeInTheDocument();
  });

  test("toggles dropdown content on button click", () => {
    const toggleButton = screen.getByRole("button");

    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(subLabel)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(subLabel)).toBeInTheDocument();
  });

  test("closes dropdown when clicking outside", () => {
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText("Dropdown Content")).not.toBeInTheDocument();
  });
});
