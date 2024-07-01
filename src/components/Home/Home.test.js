import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Home } from "./Home";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Home Component", () => {
  test("Should load Forget-Me-Not Collection", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("forget-me-not-title");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("forget-me-not-paragraph");
    expect(paragraphElement).toBeInTheDocument();

    const imageElement = screen.getByTestId("forget-me-not-image");
    expect(imageElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId("forget-me-not-button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Should load Diamond Loop Collection", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("diamond-loop-title");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("diamond-loop-paragraph");
    expect(paragraphElement).toBeInTheDocument();

    const imageElement = screen.getByTestId("diamond-loop-image");
    expect(imageElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId("diamond-loop-button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Should load Sunflower Collection", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("sunflower-title");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("sunflower-paragraph");
    expect(paragraphElement).toBeInTheDocument();

    const imageElement = screen.getByTestId("sunflower-image");
    expect(imageElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId("sunflower-button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Should load Sparkling Cluster Collection", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("sparkling-cluster-title");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("sparkling-cluster-paragraph");
    expect(paragraphElement).toBeInTheDocument();

    const imageElement = screen.getByTestId("sparkling-cluster-image");
    expect(imageElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId("sparkling-cluster-button");
    expect(buttonElement).toBeInTheDocument();
  });
});
