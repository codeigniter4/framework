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
          <Route exact path="/vgdt-admin/loads" component={LoadBoard} />
          <Route path="/vgdt-admin/loads/:id" component={LoadForm} />
          <Route exact path="/vgdt-admin/brokers" component={BrokerBoard} />
          <Route path="/vgdt-admin/brokers/:id" component={BrokerForm} />
          <Route exact path="/vgdt-admin/" component={Dashboard} />
        </Switch>
    </Router>
  );
}
