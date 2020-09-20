import React, { Component, createContext } from 'react';
import { get, getByID, save, deleteById, exportToCSV } from '../services/';

export const AdminContext = createContext();

class AdminContextProvider extends Component {
  constructor(props) {
    super()
    this.state = {
      records: [],
      filteredRecords: [],
      searchTerm: '',
      record: {},
      openModal: false,
      deleteRecord: {},
      exportToCSV: []
    }
    this.getAllRecords = this.getAllRecords.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.filterRecords = this.filterRecords.bind(this);
    this.setRecord = this.setRecord.bind(this);
    this.setRecords = this.setRecords.bind(this);
    this.getRecord = this.getRecord.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.exportRecordToCSV = this.exportRecordToCSV.bind(this);
  }

  async getAllRecords(table) {
    const response = await get(table);
    this.setState({
      records: [...response]
    })
    return response;
  }

  async exportRecordToCSV(table, records) {
    const response = await exportToCSV(table, records);
    return response
  }

  async saveRecord(table, record) {
    const response = await save(table, record);
    this.setState({
      record: {...record}
    })
    return response
  }

  async deleteRecord(table, ids) {
    await ids.map(id => {
      const response = deleteById(table, id);
      this.setState({
        deleteRecord: {...response}
      });
      return response;
    })

    this.getAllRecords(table);
  }

  filterRecords(fields, searchTerm) {
    if(fields.length) {
      const results = fields.map(field => {
        return this.state.records.filter(record => record[field] && record[field].toLowerCase().includes(searchTerm.toLowerCase()));
      })

      const filteredRecords = [];

      results.map(result => {
        result.map(rec => {
          filteredRecords.push(rec)
        })
      })

      this.setState({
        filteredRecords: filteredRecords,
        searchTerm
      })
    }
  }

  setRecord(record, callback) {
    this.setState({
      record: {...record}
    })
  }

  setRecords(records, callback) {
    this.setState({
      records: {...records}
    })
  }

  async getRecord(table, id) {
    const response = await getByID(table, id);
    this.setState({
      record: {...response}
    });
    return response
  }

  addRecord(record) {
    this.setState({
      records: [...this.state.records, {...record}]
    });
  }

  updateRecord(event) {
    const name = event.target.name;
    this.setState({
      record: {
        ...this.state.record,
        [name]: event.target.value}
    })
  }

  render() {
    return (
      <AdminContext.Provider
        value={{...this.state,
          addRecord: this.addRecord,
          filterRecords: this.filterRecords,
          getRecord: this.getRecord,
          saveRecord: this.saveRecord,
          deleteRecord: this.deleteRecord,
          updateRecord: this.updateRecord,
          getAllRecords: this.getAllRecords,
          setRecord: this.setRecord,
          setRecords: this.setRecords,
          exportRecordToCSV: this.exportRecordToCSV
        }
      }>
        {this.props.children}
      </AdminContext.Provider>
    );
  }
}

export default AdminContextProvider;
