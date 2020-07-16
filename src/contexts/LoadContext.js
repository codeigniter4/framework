import React, { Component, createContext } from 'react';
import { getLoads } from '../services/LoadService';

export const LoadContext = createContext();

class LoadContextProvider extends Component {
  state = {
    loads: [],
    filteredLoads: [],
    searchTerm: ''
  }
  componentDidMount() {
    getLoads().then(loadData => {
      this.setState({
        loads: [...loadData]
      })
    });
  }

  filterLoads = (searchTerm) => {
    const result = this.state.loads.filter(load => {
      return load.id.includes(searchTerm)
    });

    this.setState({
      filteredLoads: [...result],
      searchTerm
    })
  }

  addLoad = (load) => {
    this.setState({
      loads: [...this.state.loads, {...load}]
    });
  }

  render() {
    return (
      <LoadContext.Provider
        value={{...this.state, addLoad: this.addLoad, filterLoads: this.filterLoads}
      }>
        {this.props.children}
      </LoadContext.Provider>
    );
  }
}

export default LoadContextProvider;
