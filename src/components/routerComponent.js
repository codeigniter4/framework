import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from '../containers/Dashboard';
import LoadBoard from '../containers/LoadBoard';
import BrokerBoard from '../containers/BrokerBoard';
import UserBoard from '../containers/UserBoard';
import DriverBoard from '../containers/DriverBoard';
import DriverForm from '../containers/DriverForm';
import Equipment from '../containers/Equipment';
import EquipmentForm from '../containers/EquipmentForm';
import Invoices from '../containers/Invoices';
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
          <Route exact path="/vgdt-admin/users" component={UserBoard} />
          <Route exact path="/vgdt-admin/drivers" component={DriverBoard} />
          <Route path="/vgdt-admin/drivers/:id" component={DriverForm} />
          <Route exact path="/vgdt-admin/equipment" component={Equipment} />
          <Route path="/vgdt-admin/equipment/:id" component={EquipmentForm} />
          <Route exact path="/vgdt-admin/invoices" component={Invoices} />
          <Route exact path="/vgdt-admin/" component={Dashboard} />
          <Route exact path="/" component={Dashboard} />
        </Switch>
    </Router>
  );
}
