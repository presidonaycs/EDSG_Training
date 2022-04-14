import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import ReactNotifications from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import Homepage from "./components/home";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminPortal from "./components/AdminPortal";

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div style={{ height: "100%" }}>
        <ReactNotifications />
        <Switch>
          <Route path="/" exact component={Homepage} />

          <ProtectedRoute path="/training-manager/" component={AdminPortal} />
          <Route render={() => <h1>Error 404. Page not found.</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
