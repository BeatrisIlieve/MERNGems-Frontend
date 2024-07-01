import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Account } from "./Account";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";

const userId = "user-id";

const mockAuthContextValue = {
  userId: userId,
};

jest.mock("../../../services/personalInformationService", () => ({
  personalInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();

describe("Account Component", () => {
  beforeEach(() => {
    personalInformationServiceFactory.mockReturnValue({
      find: mockFind,
    });
  });

  test("Should load Account Component", async () => {
    const mockUserPersonalInformation = {
      firstName: "Test",
    };

    mockFind.mockResolvedValue(mockUserPersonalInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Account />
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("title-element");
    expect(titleElement).toBeInTheDocument();

    await waitFor(() => {
      expect(titleElement).toHaveTextContent(
        `Hi, ${mockUserPersonalInformation.firstName}`
      );
    });

    const paragraphElement = screen.getByTestId("paragraph-element");
    expect(paragraphElement).toBeInTheDocument();

    const accountDetailsTitleElement = screen.getByTestId(
      "account-details-title-element"
    );
    expect(accountDetailsTitleElement).toBeInTheDocument();

    const orderHistoryTitleElement = screen.getByTestId(
      "order-history-title-element"
    );
    expect(orderHistoryTitleElement).toBeInTheDocument();

    expect(accountDetailsTitleElement).toHaveClass("selected");

    expect(orderHistoryTitleElement).not.toHaveClass("selected");

    fireEvent.click(orderHistoryTitleElement);

    expect(orderHistoryTitleElement).toHaveClass("selected");

    expect(accountDetailsTitleElement).not.toHaveClass("selected");
  });
});
