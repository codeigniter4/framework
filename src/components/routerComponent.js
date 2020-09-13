import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from '../containers/Dashboard';
import LoadBoard from '../containers/LoadBoard';
import BrokerBoard from '../containers/BrokerBoard';
import LoadForm from '../containers/LoadForm';
import BrokerForm from '../containers/BrokerForm';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-admin/dashboard" component={LoadBoard} />
          <Route exact path="/vgdt-admin/loadboard" component={LoadBoard} />
          <Route path="/vgdt-admin/loadboard/:id" component={LoadForm} />
          <Route exact path="/vgdt-admin/brokerboard" component={BrokerBoard} />
          <Route path="/vgdt-admin/brokerboard/:id" component={BrokerForm} />
          <Route exact path="/vgdt-admin/" component={Dashboard} />
        </Switch>
    </Router>
  );
}
