import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Demo from '../containers/Demo';
import Dashboard from '../containers/Dashboard';
import LoadBoard from '../containers/LoadBoard';

export default function RouterComponent() {
  return (
    <Router>
        <Switch>
          <Route path="/demo">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/loadboard">
            <LoadBoard />
          </Route>
          <Route path="/">
            <LoadBoard />
          </Route>
        </Switch>
    </Router>
  );
}
