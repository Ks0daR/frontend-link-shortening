import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage";

export const useRoutes = (isAuthorized) => {
  if (isAuthorized) {
    return (
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
};
