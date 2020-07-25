import React, { Component, createContext } from 'react';
import { getLoads, getLoadByID, saveLoad, deleteLoadById } from '../services/LoadService';

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
      this.setState({
        load: {...response}
      })
      this.getAllLoads();
    })
  }

  deleteLoad = (id) => {
    deleteLoadById(id).then(response => {
      this.getAllLoads();
      this.toggleModal(false);
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

  setLoadFromList = (id) => {
    const result = this.state.loads.filter(load => {
      return load.id.includes(id)
    });
    this.setState({
      load: {...result}
    })
  }

  setLoad = (id) => {
    if(!id){
      this.setState({
        load: {}
      })
    }else {
      // const result = this.state.loads.filter(load => {
      //   return load.id.includes(id)
      // });
      // this.setState({
      //   load: {...result[0]}
      // })
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


  updateLoad = (event) => {
    console.log('updateLoad: ', event.target.name);
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
          toggleModal: this.toggleModal,
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
