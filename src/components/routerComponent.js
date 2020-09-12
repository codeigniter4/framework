import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Demo from '../containers/Demo';
import Dashboard from '../containers/Dashboard';
import LoadBoard from '../containers/LoadBoard';
import LoadForm from '../containers/LoadForm';

export default function RouterComponent() {
  return (
    <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/loadboard" component={LoadBoard} />
          <Route exact path="/loadboard/:id" component={LoadForm} />
          <Route path="/" component={LoadBoard} />
        </Switch>
    </Router>
  );
}
