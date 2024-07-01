// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import { RouteGuard } from './RouteGuard';
// import { useAuthContext } from '../../contexts/AuthContext';
// import { Navigate } from 'react-router-dom';

// // Mocking useAuthContext
// jest.mock('../../contexts/AuthContext', () => ({
//   useAuthContext: jest.fn(),
// }));

// describe('RouteGuard', () => {
//   const mockUseAuthContext = useAuthContext;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const renderWithRouter = (ui, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route);
//     return render(ui, { wrapper: MemoryRouter });
//   };

//   it('navigates to /user/login if not authenticated and not on /user/payment', () => {
//     mockUseAuthContext.mockReturnValue({ isAuthenticated: false });

//     renderWithRouter(
//       <Routes>
//         <Route path="/" element={<RouteGuard><div>Protected</div></RouteGuard>} />
//         <Route path="/user/login" element={<div>Login Page</div>} />
//       </Routes>
//     );

//     expect(screen.getByText('Login Page')).toBeInTheDocument();
//   });

//   it('renders children if authenticated', () => {
//     mockUseAuthContext.mockReturnValue({ isAuthenticated: true });

//     renderWithRouter(
//       <Routes>
//         <Route path="/" element={<RouteGuard><div>Protected</div></RouteGuard>} />
//       </Routes>
//     );

//     expect(screen.getByText('Protected')).toBeInTheDocument();
//   });

//   it('renders Outlet if authenticated and no children are provided', () => {
//     mockUseAuthContext.mockReturnValue({ isAuthenticated: true });

//     renderWithRouter(
//       <Routes>
//         <Route path="/" element={<RouteGuard />} />
//       </Routes>
//     );

//     expect(screen.getByText('Outlet')).toBeInTheDocument();
//   });

//   it('allows access to /user/payment even if not authenticated', () => {
//     mockUseAuthContext.mockReturnValue({ isAuthenticated: false });

//     renderWithRouter(
//       <Routes>
//         <Route path="/user/payment" element={<RouteGuard><div>Payment Page</div></RouteGuard>} />
//       </Routes>,
//       { route: '/user/payment' }
//     );

//     expect(screen.getByText('Payment Page')).toBeInTheDocument();
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RouteGuard } from "./RouteGuard";
import { useAuthContext } from "../../contexts/AuthContext";

// Mocking useAuthContext
jest.mock("../../contexts/AuthContext", () => ({
  useAuthContext: jest.fn(),
}));

describe("RouteGuard Component", () => {
  const mockUseAuthContext = useAuthContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: MemoryRouter });
  };

  test("navigates to /user/login if not authenticated", () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: false });

    renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <div>Protected</div>
            </RouteGuard>
          }
        />
        <Route path="/user/login" element={<div>Login Page</div>} />
      </Routes>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders children if authenticated", () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: true });

    renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <div>Protected</div>
            </RouteGuard>
          }
        />
      </Routes>
    );

    expect(screen.getByText("Protected")).toBeInTheDocument();
  });
});
