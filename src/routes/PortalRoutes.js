import React from "react";
import { Switch, Route } from "react-router";
import { pure } from "recompose";

import ProtectedRoute from "./ProtectedRoute";
import SessionHOC from "../components/hoc/SessionHOC";

import Dashboard from "../components/pages/Dashboard";

// Training App
import TrainingRequest from "../components/pages/TrainingRequest";
import CompletedTraining from "../components/pages/CompletedTraining";
import TrainingRequestApproval from "../components/pages/TrainingRequestApproval";
import DeclinedRequest from "../components/pages/DeclinedRequest";
import ApprovedRequest from "../components/pages/ApprovedRequest";

// Setup
import TrainingCategorySetup from "../components/pages/TrainingCategorySetup";
import TrainingMethodSetup from "../components/pages/TrainingMethodSetup";
import TrainingApproverSetup from "../components/pages/TrainingApproverSetup";

export default pure(() => (
  <Switch>
    <ProtectedRoute
      path="/training-manager/"
      exact
      component={SessionHOC(Dashboard)}
    />

    <ProtectedRoute
      path="/training-manager/request"
      exact
      component={SessionHOC(TrainingRequest)}
    />
    <ProtectedRoute
      path="/training-manager/approved-request"
      exact
      component={SessionHOC(ApprovedRequest)}
    />
    <ProtectedRoute
      path="/training-manager/declined-request"
      exact
      component={SessionHOC(DeclinedRequest)}
    />
    <ProtectedRoute
      path="/training-manager/completed"
      exact
      component={SessionHOC(CompletedTraining)}
    />
    <ProtectedRoute
      path="/training-manager/approval"
      exact
      component={SessionHOC(TrainingRequestApproval)}
    />
    <ProtectedRoute
      path="/training-manager/category"
      exact
      component={SessionHOC(TrainingCategorySetup)}
    />
    <ProtectedRoute
      path="/training-manager/method"
      exact
      component={SessionHOC(TrainingMethodSetup)}
    />
    <ProtectedRoute
      path="/training-manager/approver"
      exact
      component={SessionHOC(TrainingApproverSetup)}
    />

    <Route render={() => <h1>Error 404. Page not found.</h1>} />
  </Switch>
));
