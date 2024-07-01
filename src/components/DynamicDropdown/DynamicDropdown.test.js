import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DynamicDropdown } from "./DynamicDropdown";

describe("DynamicDropdown Component", () => {
  const label = "Test Label";
  const options = [
    { _id: "1", title: "Option 1", count: 10 },
    { _id: "2", title: "Option 2", count: 5 },
  ];
  const selectionKey = "testKey";
  const selection = { testKey: [] };
  const changeHandler = jest.fn();
  const submitHandler = jest.fn();
  const clearFilter = jest.fn();
  const onDropdownToggle = jest.fn();

  beforeEach(() => {
    render(
      <DynamicDropdown
        label={label}
        options={options}
        selectionKey={selectionKey}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        selection={selection}
        clearFilter={clearFilter}
        isSelected={false}
        onDropdownToggle={onDropdownToggle}
      />
    );
  });

  test("renders correctly with label", () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("toggles dropdown content on button click", () => {
    const toggleButton = screen.getByRole("button");

    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });

  test("closes dropdown when clicking outside", () => {
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });
});
