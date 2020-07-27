import React, { Component, createContext } from 'react';
import { getLoads, getLoadByID, saveLoad, deleteLoadById } from '../services/LoadService';

export const LoadContext = createContext();

class LoadContextProvider extends Component {
  constructor() {
    super()
    this.state = {
      loads: [],
      filteredLoads: [],
      searchTerm: '',
      load: {},
      openModal: false,
      deletedload: {}
    }
    this.getAllLoads = this.getAllLoads.bind(this);
    this.save = this.save.bind(this);
    this.deleteLoad = this.deleteLoad.bind(this);
    this.filterLoads = this.filterLoads.bind(this);
    this.setLoadFromList = this.setLoadFromList.bind(this);
    this.setLoad = this.setLoad.bind(this);
    this.addLoad = this.addLoad.bind(this);
    this.updateLoad = this.updateLoad.bind(this);
  }

  componentDidMount() {
    this.getAllLoads()
  }

  async getAllLoads() {
    const response = await getLoads();
    this.setState({
      loads: [...response]
    })
  }

  async save(load) {
    const response = await saveLoad(load);
    this.setState({
      load: {...response}
    })
    this.getAllLoads();
  }

  async deleteLoad(id) {
    const response = await deleteLoadById(id);
    this.setState({
      deletedload: {...response}
    });
    this.getAllLoads();
  }

  filterLoads(searchTerm) {
    const result = this.state.loads.filter(load => {
      return load.id.includes(searchTerm)
    });

    this.setState({
      filteredLoads: [...result],
      searchTerm
    })
  }

  setLoadFromList(id) {
    const result = this.state.loads.filter(load => {
      return load.id.includes(id)
    });
    this.setState({
      load: {...result}
    })
  }

  async setLoad(id) {
    const response = await getLoadByID(id);
    this.setState({
      load: {...response}
    });
  }

  addLoad(load) {
    this.setState({
      loads: [...this.state.loads, {...load}]
    });
  }

  updateLoad(event) {
    const name = event.target.name;
    this.setState({
      load: {
        ...this.state.load,
        [name]: event.target.value}
    })
  }

  render() {
    return (
      <LoadContext.Provider
        value={{...this.state,
          addLoad: this.addLoad,
          filterLoads: this.filterLoads,
          setLoad: this.setLoad,
          save: this.save,
          deleteLoad: this.deleteLoad,
          updateLoad: this.updateLoad
        }
      }>
        {this.props.children}
      </LoadContext.Provider>
    );
  }
}

export default LoadContextProvider;
