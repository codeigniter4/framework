import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';
import { LOAD_MODEL, LOAD_TYPES, LOAD_STATUS } from '../../constants';
import { get } from '../../services/';

const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}


const LoadListView = (props) => {
  const { history } = props;
  const [brokers, setBrokers] = useState([]);
  return (
    <LoadContext.Consumer>{(context) => {
      const { loads, filteredLoads, searchTerm, filterLoads, getAllLoads, deleteLoads, save } = context;
      const rows = searchTerm ? filteredLoads : [...loads];

      if(!rows.length){
        getAllLoads();
        getAllBrokers().then(data => {
          setBrokers(data)
        })
      }
      const handleClick = (id) => {
        history.push('/vgdt-admin/loadboard/' + id);
      }
      const editButton = (id) => (
          <Button color="primary" onClick={() => handleClick(id)}>Edit</Button>
      );
      const updateRowData = rows.map(row => {
        row.edit = editButton(row.id);
        LOAD_TYPES.map(item => {
          if(row.type === item.type) {
            row.type = item.label
          }
          return row
        })
        LOAD_STATUS.map(item => {
          if(row.status === item.type) {
            row.status = item.label
          }
          return row
        })

        brokers.map(broker => {
          if (broker.id === row.broker) {
            row.broker = broker.name
          }
        })

        row.pickupDate = new Date(row.pickupDate).toLocaleString();
        row.dropoffDate = new Date(row.dropoffDate).toLocaleString();
        return row;
      })



      const handleChange = (e) => {
        filterLoads(e.target.value)
      }

      const handleAdd = () => {
        save(LOAD_MODEL).then(data => {
          getAllLoads()
        })
      }

      return (
        <React.Fragment>
          <ListToolBar handleChange={handleChange} handleAdd={handleAdd}/>
          <ListTable columns={loadColumns} rows={updateRowData} deleteSelected={deleteLoads}/>
        </React.Fragment>
      )
    }}
    </LoadContext.Consumer>
  )
}

LoadListView.propTypes = {
};

export default (LoadListView);
