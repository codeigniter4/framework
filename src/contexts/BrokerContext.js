import React, { Component, createContext } from 'react';
import { get, getByID, save, deleteById } from '../services/';

export const BrokerContext = createContext();

class BrokerContextProvider extends Component {
  constructor() {
    super()
    this.state = {
      brokers: [],
      filteredBrokers: [],
      searchTerm: '',
      broker: {},
      openModal: false,
      deletedBroker: {}
    }
    this.getAllBrokers = this.getAllBrokers.bind(this);
    this.save = this.save.bind(this);
    this.deleteBrokers = this.deleteBrokers.bind(this);
    this.filterBrokers = this.filterBrokers.bind(this);
    this.setBrokerFromList = this.setBrokerFromList.bind(this);
    this.getBroker = this.getBroker.bind(this);
    this.addBroker = this.addBroker.bind(this);
    this.updateBroker = this.updateBroker.bind(this);
  }

  async getAllBrokers() {
    const response = await get('brokers');
    this.setState({
      brokers: [...response]
    })
  }

  async save(broker) {
    const response = await save('brokers', broker);
    this.setState({
      broker: {...response}
    })
  }

  async deleteBrokers(ids) {
    await ids.map(id => {
      const response = deleteById('brokers', id);
      this.setState({
        deletedBroker: {...response}
      });
      return response;
    })

    this.getAllBrokers();
  }

  filterBrokers(searchTerm) {
    const result = this.state.brokers.filter(broker => {
      return broker.id.includes(searchTerm)
    });

    this.setState({
      filteredBrokers: [...result],
      searchTerm
    })
  }

  setBrokerFromList(id) {
    const result = this.state.brokers.filter(broker => {
      return broker.id.includes(id)
    });
    this.setState({
      Broker: {...result}
    })
  }

  async getBroker(id) {
    const response = await getByID('brokers', id);
    this.setState({
      Broker: {...response}
    });
  }

  addBroker(broker) {
    this.setState({
      brokers: [...this.state.brokers, {...broker}]
    });
  }

  updateBroker(event) {
    const name = event.target.name;
    this.setState({
      Broker: {
        ...this.state.Broker,
        [name]: event.target.value}
    })
  }

  render() {
    return (
      <BrokerContext.Provider
        value={{...this.state,
          addBroker: this.addBroker,
          filterBrokers: this.filterBrokers,
          getBroker: this.getBroker,
          save: this.save,
          deleteBrokers: this.deleteBrokers,
          updateBroker: this.updateBroker,
          getAllBrokers: this.getAllBrokers
        }
      }>
        {this.props.children}
      </BrokerContext.Provider>
    );
  }
}

export default BrokerContextProvider;
