import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/LoginPage";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import ThemeDefault from "./theme-default";

export default (
  <Router>
    <MuiThemeProvider theme={ThemeDefault}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </MuiThemeProvider>
  </Router>
);
