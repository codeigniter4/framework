import React, { Component, createContext } from 'react';
import { getLoads } from '../services/LoadService';

export const LoadContext = createContext();

class LoadContextProvider extends Component {
  state = {
    loads: []
  }
  componentDidMount() {
    getLoads().then(loadData => {
      this.setState({
        loads: [...loadData]
      })
    });
  }

  addLoad = (load) => {
    this.setState({
      loads: [...this.state.loads, {...load}]
    });
  }

  render() {
    return (
      <LoadContext.Provider value={{...this.state}} addLoad={this.addLoad}>
        {this.props.children}
      </LoadContext.Provider>
    );
  }
}

export default LoadContextProvider;
