import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { LoadContext } from '../../contexts/LoadContext';
import ListTable from '../ListTable';
import ListToolBar from '../ListToolBar';
import { loadColumns } from './constants/loadColumns';
import { LOAD_MODEL } from '../../constants';
import { get } from '../../services/';

const getAllBrokers = () => {
  const response = get('brokers');
  return response;
}


const getTodayAndTommorrowDates = () => {
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  let date = new Date();

  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  const today = date.toISOString();
  const tomorrow = date.addDays(1).toISOString();

  return { today, tomorrow }
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
        const updatedLoad = {...LOAD_MODEL};
        const { today, tomorrow } = getTodayAndTommorrowDates();

        updatedLoad.pickupDate = today;
        updatedLoad.dropoffDate = tomorrow;
        save(updatedLoad).then(data => {
          history.push('/vgdt-admin/loadboard/' + data.id);
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
