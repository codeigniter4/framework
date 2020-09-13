import React, { Component, createContext } from 'react';
import { get, getByID, save, deleteById } from '../services/';

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
    this.deleteLoads = this.deleteLoads.bind(this);
    this.filterLoads = this.filterLoads.bind(this);
    this.setLoadFromList = this.setLoadFromList.bind(this);
    this.getLoad = this.getLoad.bind(this);
    this.addLoad = this.addLoad.bind(this);
    this.updateLoad = this.updateLoad.bind(this);
  }

  async getAllLoads() {
    const response = await get('loads');
    this.setState({
      loads: [...response]
    })
  }

  async save(load) {
    const response = await save('loads', load);
    this.setState({
      load: {...response}
    })
  }

  async deleteLoads(ids) {
    await ids.map(id => {
      const response = deleteById('loads', id);
      this.setState({
        deletedload: {...response}
      });
    })

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

  async getLoad(id) {
    const response = await getByID('loads', id);
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
          getLoad: this.getLoad,
          save: this.save,
          deleteLoads: this.deleteLoads,
          updateLoad: this.updateLoad,
          getAllLoads: this.getAllLoads
        }
      }>
        {this.props.children}
      </LoadContext.Provider>
    );
  }
}

export default LoadContextProvider;
