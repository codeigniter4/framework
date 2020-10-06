import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

// import Dashboard from '../containers/Dashboard';
// import LoadBoard from '../containers/LoadBoard';
// import BrokerBoard from '../containers/BrokerBoard';
// import UserBoard from '../containers/UserBoard';
// import DriverBoard from '../containers/DriverBoard';
// import DriverForm from '../containers/DriverForm';
// import DispatchBoard from '../containers/DispatchBoard';
// import DispatchForm from '../containers/DispatchForm';
// import Equipment from '../containers/Equipment';
// import EquipmentForm from '../containers/EquipmentForm';
// import Invoices from '../containers/Invoices';
// import LoadForm from '../containers/LoadForm';
// import BrokerForm from '../containers/BrokerForm';
// import AssetManager from '../containers/AssetManager';
import CommonBoard from '../containers/CommonBoard';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-admin/:table" component={CommonBoard} />
          <Route exact path="/" component={CommonBoard} />
        </Switch>
    </Router>
  );
}
