import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

// import Dashboard from '../containers/Dashboard';
// import DriverForm from '../containers/DriverForm';
// import CommonForm from '../containers/CommonForm';
// import EquipmentForm from '../containers/EquipmentForm';
// import Invoices from '../containers/Invoices';
// import LoadForm from '../containers/LoadForm';
// import BrokerForm from '../containers/BrokerForm';
// import AssetManager from '../containers/AssetManager';
import CommonBoard from '../containers/CommonBoard';
import CommonForm from '../containers/CommonForm';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-admin/:table" component={CommonBoard} />
          <Route exact path="/vgdt-admin/:table/type/:position" component={CommonBoard} />
          <Route exact path="/vgdt-admin/:table/:id" component={CommonForm} />
          <Route exact path="/vgdt-admin/:table/type/:position/:id" component={CommonForm} />
          <Route exact path="/" component={CommonBoard} />
        </Switch>
    </Router>
  );
}
