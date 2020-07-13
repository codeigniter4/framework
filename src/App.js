import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RouterComponent from './components/RouterComponent';
import Header from './components/header/';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router history={this.props.history}>
          <RouterComponent />
        </Router>
      </div>
    );
  }
}

export default App;
