import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PropTypes from 'prop-types';

import Dashboard from '../containers/Dashboard/';

const RouterComponent = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
  </Switch>
);

RouterComponent.contextTypes = {
  store: PropTypes.object,
};

export default RouterComponent;
