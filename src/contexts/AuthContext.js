import { createContext, useContext, useEffect } from "react";
import { authServiceFactory } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const authService = authServiceFactory(auth.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  const resetTimer = () => {
    if (auth.accessToken) {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(async () => {
        setAuth({});

        localStorage.removeItem("auth");
        await authService.logout();
      }, 600000);
    }
  };

  let logoutTimer;

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    if (auth.accessToken) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("scroll", handleActivity);

      resetTimer();
    }

    return () => {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("scroll", handleActivity);

      clearTimeout(logoutTimer);
    };
  }, [auth.accessToken]);

  const onRegisterSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";

    const lastLocation = localStorage.getItem("lastLocation") || from;

    try {
      const result = await authService.register({ ...data });

      const token = result["token"];

      setAuth(token);

      navigate(lastLocation, { replace: true });
    } catch (err) {
      const errorMessage = err.message;
      console.log(err.message);
      throw new Error(errorMessage);
    }
  };

  const onLoginSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";

    const lastLocation = localStorage.getItem("lastLocation") || from;

    try {
      const result = await authService.login({ ...data });

      const token = result["token"];

      setAuth(token);

      navigate(lastLocation, { replace: true });
    } catch (err) {
      const errorMessage = err.message;
      console.log(err.message);
      throw new Error(errorMessage);
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});

    localStorage.removeItem("auth");

    navigate("/user/login");
  };

  const onDelete = async () => {
    navigate("/user/register");

    await authService.delete(auth._id);

    setAuth({});

    localStorage.removeItem("auth");
    localStorage.removeItem("userUUID");

    localStorage.removeItem("lastLocation");

    navigate("/user/register");
  };

  const context = {
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    onDelete,
    userId: auth._id,
    token: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
