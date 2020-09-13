import React from 'react';
import { Button } from '@material-ui/core';
import { BrokerContext } from '../../contexts/BrokerContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { brokerColumns } from './constants/brokerColumns';
import { BROKER_MODEL } from '../../constants';


const BrokerListView = (props) => {

  return (
    <BrokerContext.Consumer>{(context) => {
      const { brokers, filteredBrokers, searchTerm, filterBrokers, getAllBrokers, deleteBrokers, save } = context;
      const rows = searchTerm ? filteredBrokers : [...brokers];

      if(!rows.length){
        getAllBrokers();
      }
      const handleClick = (id) => {
        props.history.push('/vgdt-admin/brokerboard/' + id);
      }
      const editButton = (id) => (
          <Button color="primary" onClick={() => handleClick(id)}>Edit</Button>
      );
      const updateRowData = rows.map(row => {
        row.edit = editButton(row.id);
        return row;
      })

      const handleChange = (e) => {
        filterBrokers(e.target.value)
      }

      const handleAdd = () => {
        save(BROKER_MODEL).then(data => {
          getAllBrokers()
        })
      }

      return (
        <React.Fragment>
          <ListToolBar handleChange={handleChange} handleAdd={handleAdd}/>
          <ListTable columns={brokerColumns} rows={updateRowData} deleteSelected={deleteBrokers}/>
        </React.Fragment>
      )
    }}
    </BrokerContext.Consumer>
  )
}

BrokerListView.propTypes = {
};

export default (BrokerListView);
