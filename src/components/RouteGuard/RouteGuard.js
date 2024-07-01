import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export const RouteGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/user/payment") {
    return <Navigate to="/user/login" state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};
