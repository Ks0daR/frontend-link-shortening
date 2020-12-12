import React from "react";
import { Layout } from "./components/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useRoutes } from "./routes";

function App() {
  const { login, logout, jwtToken, userId } = useAuth();
  const isAuthorized = !!jwtToken;

  const routes = useRoutes(isAuthorized);
  return (
    <AuthContext.Provider
      value={{ login, logout, jwtToken, userId, isAuthorized }}
    >
      <Layout>{routes}</Layout>
    </AuthContext.Provider>
  );
}

export default App;
