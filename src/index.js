import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorProvider } from "./contexts/ErrorContext";
import { UserUUIDProvider } from "./contexts/UserUUIDContext";
import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { BagProvider } from "./contexts/BagContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ErrorProvider>
        <UserUUIDProvider>
          <AuthProvider>
            <WishlistProvider>
              <BagProvider>
                <App />
              </BagProvider>
            </WishlistProvider>
          </AuthProvider>
        </UserUUIDProvider>
      </ErrorProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
