import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { OrderConfirmation } from "./OrderConfirmation";
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBagContext } from "../../contexts/BagContext";

jest.mock("../../hooks/useService");

jest.mock("../../contexts/AuthContext");
jest.mock("../../contexts/BagContext");

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("<OrderConfirmation />", () => {
  const mockUserId = "123456789";
  const mockOrder = {
    _id: "987654321",
  };
  const mockPersonalInformation = {
    firstName: "John",
  };

  beforeEach(() => {
    const mockOrderConfirmationService = {
      findOne: jest.fn().mockResolvedValue(mockOrder),
    };
    const mockPersonalInformationService = {
      find: jest.fn().mockResolvedValue(mockPersonalInformation),
    };
    useService.mockReturnValueOnce(mockOrderConfirmationService);
    useService.mockReturnValueOnce(mockPersonalInformationService);

    useAuthContext.mockReturnValue({ userId: mockUserId });

    const mockClearShoppingBag = jest.fn();
    useBagContext.mockReturnValue({ clearShoppingBag: mockClearShoppingBag });
  });

  it("renders order confirmation details when order and personal information are fetched", async () => {
    render(
      <MemoryRouter>
        <OrderConfirmation />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          `Thank you for your purchase, ${mockPersonalInformation.firstName}!`
        )
      ).toBeInTheDocument();
      expect(screen.getByText(`ID: #${mockOrder._id}`)).toBeInTheDocument();
    });

    expect(useBagContext().clearShoppingBag).toHaveBeenCalled();
  });
});
