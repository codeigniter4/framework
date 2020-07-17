import React, { Component, createContext } from 'react';
import { getLoads, getLoadByID, saveLoad } from '../services/LoadService';

export const LoadContext = createContext();

class LoadContextProvider extends Component {
  state = {
    loads: [],
    filteredLoads: [],
    searchTerm: '',
    load: {},
    openModal: false
  }
  componentDidMount() {
    this.getAllLoads()
  }

  getAllLoads = () => {
    getLoads().then(loadData => {
      this.setState({
        loads: [...loadData]
      })
    });
  }

  save = (load) => {
    saveLoad(load).then(response => {
      this.getAllLoads()
    })
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

  setLoad = (id) => {
    if(!id){
      this.setState({
        load: {}
      })
    }else {
      getLoadByID(id).then(data => {
        this.setState({
          load: {...data}
        })
      })
    }
  }

  addLoad = (load) => {
    this.setState({
      loads: [...this.state.loads, {...load}]
    });
  }

  toggleModal = (open) => {
    this.setState({
      openModal: open
    });
  }

  render() {
    return (
      <LoadContext.Provider
        value={{...this.state,
          addLoad: this.addLoad,
          filterLoads: this.filterLoads,
          setLoad: this.setLoad,
          toggleModal: this.toggleModal,
          save: this.save
        }
      }>
        {this.props.children}
      </LoadContext.Provider>
    );
  }
}

export default LoadContextProvider;
